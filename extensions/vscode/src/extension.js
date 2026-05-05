const vscode = require('vscode');
const { WebSocketServer } = require('ws');
const fs = require('fs').promises;

let wss = null;
let statusBar = null;
let clients = new Set();
const scriptRegistry = new Map(); // Registry des scripts locaux
let lastScriptSync = 0;

function activate(context) {
  console.log('ScriptCat Sync activé');

  // Status bar
  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.command = 'scriptcat-sync.start';
  updateStatus('stopped');
  statusBar.show();

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('scriptcat-sync.start', startServer),
    vscode.commands.registerCommand('scriptcat-sync.stop', stopServer),
    vscode.commands.registerCommand('scriptcat-sync.push', pushCurrentScript),
    vscode.commands.registerCommand('scriptcat-sync.sync-all', syncAllScripts),
    vscode.commands.registerCommand('scriptcat-sync.request-missing', requestMissingScripts),
    statusBar
  );

  // Auto-push on save
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      if (doc.fileName.endsWith('.user.js') && clients.size > 0) {
        pushScript(doc);
      }
    })
  );

  // Auto-start server
  const config = vscode.workspace.getConfiguration('scriptcat-sync');
  if (config.get('autoConnect')) {
    startServer();
  }
}

// === FONCTIONNALITÉS BIDIRECTIONNELLES ===
async function requestMissingScripts() {
  // Demander les scripts manquants aux clients ScriptCat
  broadcastToClients({
    type: 'request_script_list',
    timestamp: Date.now()
  });
  
  vscode.window.showInformationMessage('Requesting missing scripts from ScriptCat...');
}

async function syncAllScripts() {
  if (!wss || clients.size === 0) {
    vscode.window.showErrorMessage('No ScriptCat clients connected');
    return;
  }
  
  try {
    // Envoyer la liste des scripts locaux
    const scriptList = await sendScriptList();
    
    // Demander la liste des scripts distants
    broadcastToClients({
      type: 'script_list_request',
      timestamp: Date.now()
    });
    
    vscode.window.showInformationMessage(`Sync initiated: ${scriptList.length} local scripts sent`);
  } catch (error) {
    vscode.window.showErrorMessage(`Sync failed: ${error.message}`);
  }
}

async function sendScriptList() {
  try {
    const scriptFiles = await fs.readdir('scripts');
    const userScriptFiles = scriptFiles.filter(file => file.endsWith('.user.js'));
    
    const scriptList = [];
    
    for (const file of userScriptFiles) {
      const content = await fs.readFile(`scripts/${file}`, 'utf8');
      const name = file.replace('.user.js', '');
      
      scriptRegistry.set(name, {
        path: `scripts/${file}`,
        updated: (await fs.stat(`scripts/${file}`)).mtime.getTime(),
        ...extractScriptMetadata(content)
      });
      
      scriptList.push({
        id: name,
        name: name,
        file: file,
        path: `scripts/${file}`,
        code: content,
        meta: extractScriptMetadata(content),
        updated: (await fs.stat(`scripts/${file}`)).mtime.getTime(),
        local: true
      });
    }
    
    broadcastToClients({
      type: 'script_list',
      data: scriptList,
      timestamp: Date.now()
    });
    
    return scriptList;
  } catch (error) {
    console.error('Error sending script list:', error);
    return [];
  }
}

function extractScriptMetadata(content) {
  // Extraire les métadonnées userscript
  const metadata = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.includes('// @')) {
      const match = line.match(/\/\/ @(\w+)\s+(.*)/);
      if (match) {
        metadata[match[1]] = match[2];
      }
    }
  }
  
  return metadata;
}

function broadcastToClients(message) {
  if (!wss) return;
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function updateStatus(state, clientCount = 0) {
  if (state === 'running') {
    statusBar.text = `$(broadcast) ScriptCat (${clientCount})`;
    statusBar.backgroundColor = undefined;
    statusBar.tooltip = `Server running - ${clientCount} client(s) connected\nClick to stop`;
    statusBar.command = 'scriptcat-sync.stop';
  } else {
    statusBar.text = '$(plug) ScriptCat';
    statusBar.tooltip = 'Server stopped - Click to start';
    statusBar.command = 'scriptcat-sync.start';
  }
}

function startServer() {
  if (wss) {
    vscode.window.showInformationMessage('ScriptCat server already running');
    return;
  }

  const config = vscode.workspace.getConfiguration('scriptcat-sync');
  const port = config.get('port') || 8642;

  try {
    wss = new WebSocketServer({ port });

    wss.on('listening', () => {
      updateStatus('running', 0);
      vscode.window.showInformationMessage(`ScriptCat server started on port ${port}`);
    });

    wss.on('connection', (ws) => {
      clients.add(ws);
      updateStatus('running', clients.size);
      vscode.window.setStatusBarMessage(`ScriptCat: Client connected (${clients.size} total)`, 3000);

      // Gestion des messages bidirectionnels
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          handleClientMessage(ws, data);
        } catch (error) {
          console.error('Error parsing client message:', error);
        }
      });

      ws.on('close', () => {
        clients.delete(ws);
        updateStatus('running', clients.size);
      });

      ws.on('error', () => {
        clients.delete(ws);
        updateStatus('running', clients.size);
      });
    });

    wss.on('error', (err) => {
      updateStatus('stopped');
      vscode.window.showErrorMessage(`ScriptCat server error: ${err.message}`);
      wss = null;
    });
  } catch (err) {
    updateStatus('stopped');
    vscode.window.showErrorMessage(`Failed to start server: ${err.message}`);
  }
}

function stopServer() {
  return new Promise((resolve) => {
    if (wss) {
      clients.forEach(client => client.close());
      clients.clear();
      wss.close(() => {
        wss = null;
        updateStatus('stopped');
        vscode.window.showInformationMessage('ScriptCat server stopped');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

function parseUserScriptMeta(code) {
  const meta = {};
  const metaMatch = code.match(/\/\/\s*==UserScript==([\s\S]*?)\/\/\s*==\/UserScript==/);

  if (metaMatch) {
    const metaBlock = metaMatch[1];
    const lines = metaBlock.split('\n');

    for (const line of lines) {
      const match = line.match(/\/\/\s*@(\S+)\s+(.*)/);
      if (match) {
        const [, key, value] = match;
        if (meta[key]) {
          if (Array.isArray(meta[key])) {
            meta[key].push(value.trim());
          } else {
            meta[key] = [meta[key], value.trim()];
          }
        } else {
          meta[key] = value.trim();
        }
      }
    }
  }

  return meta;
}

function pushScript(document) {
  const code = document.getText();
  const meta = parseUserScriptMeta(code);

  // Format compatible ScriptCat
  const message = {
    action: 'onchange',
    data: {
      script: code,
      uri: document.uri.toString()
    }
  };

  const messageStr = JSON.stringify(message);
  let sent = 0;

  clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(messageStr);
      sent++;
    }
  });

  if (sent > 0) {
    vscode.window.setStatusBarMessage(`ScriptCat: Pushed ${meta.name || 'script'} to ${sent} client(s)`, 2000);
  }
}

function pushCurrentScript() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor');
    return;
  }

  if (!editor.document.fileName.endsWith('.user.js')) {
    vscode.window.showWarningMessage('Current file is not a userscript (.user.js)');
    return;
  }

  if (clients.size === 0) {
    vscode.window.showWarningMessage('No ScriptCat clients connected');
    return;
  }

  pushScript(editor.document);
}

// === GESTION DES MESSAGES CLIENTS BIDIRECTIONNELS ===
async function handleClientMessage(ws, data) {
  console.log('Received message from client:', data.type);
  
  switch (data.type) {
    case 'script_list':
      // Reçu la liste des scripts depuis ScriptCat
      await handleScriptListFromClient(data.data);
      break;
      
    case 'script_update':
      // Mise à jour d'un script depuis ScriptCat
      await handleScriptUpdateFromClient(data.data);
      break;
      
    case 'script_delete':
      // Suppression d'un script depuis ScriptCat
      await handleScriptDeleteFromClient(data.data);
      break;
      
    case 'script_list_request':
      // Demande de la liste des scripts locaux
      await sendScriptList();
      break;
  }
}

async function handleScriptListFromClient(scripts) {
  console.log('Received script list from client:', scripts.length, 'scripts');
  
  for (const script of scripts) {
    if (!script.local) { // Ne pas écraser les scripts locaux existants
      const filePath = `scripts/${script.name}_${Date.now()}.user.js`;
      
      try {
        await fs.writeFile(filePath, script.code, 'utf8');
        scriptRegistry.set(script.name, {
          path: filePath,
          updated: Date.now(),
          ...script
        });
        console.log('📥 Script downloaded from ScriptCat:', script.name);
      } catch (error) {
        console.error('Error saving script from client:', error);
      }
    }
  }
}

async function handleScriptUpdateFromClient(scriptData) {
  console.log('📥 Script update from client:', scriptData.name || 'Unknown');
  
  try {
    const filePath = `scripts/${scriptData.name}_${Date.now()}.user.js`;
    await fs.writeFile(filePath, scriptData.code, 'utf8');
    
    scriptRegistry.set(scriptData.name, {
      path: filePath,
      updated: Date.now(),
      ...scriptData
    });
    
    vscode.window.showInformationMessage(`Script updated: ${scriptData.name || 'Unknown'}`);
  } catch (error) {
    console.error('Error updating script from client:', error);
  }
}

async function handleScriptDeleteFromClient(data) {
  console.log('🗑️ Script delete from client:', data.scriptId);
  
  const script = Array.from(scriptRegistry.values()).find(s => s.id === data.scriptId);
  if (script && script.path) {
    try {
      await fs.unlink(script.path);
      scriptRegistry.delete(script.name);
      vscode.window.showInformationMessage(`Script deleted: ${script.name || data.scriptId}`);
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  }
}

function deactivate() {
  return stopServer();
}

module.exports = { activate, deactivate };