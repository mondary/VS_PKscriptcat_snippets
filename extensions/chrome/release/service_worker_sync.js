// Service Worker simplifié pour synchronisation bidirectionnelle avec VS Code
// Version corrigée sans chrome.scripting.onScriptRegistered

class VSCodeSync {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.init();
  }

  init() {
    this.initConnection();
  }

  initConnection() {
    if (this.ws) return;
    
    try {
      const vscodeUrl = `ws://localhost:8643`;
      this.ws = new WebSocket(vscodeUrl);
      
      this.ws.onopen = () => {
        console.log('Connected to VS Code');
        this.reconnectAttempts = 0;
        this.sendScriptList();
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleVSCodeMessage(message);
        } catch (error) {
          console.error('Error parsing VS Code message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('Disconnected from VS Code');
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to VS Code:', error);
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts < 5) {
      this.reconnectAttempts++;
      console.log(`Reconnecting to VS Code (attempt ${this.reconnectAttempts})...`);
      setTimeout(() => this.initConnection(), 2000 * this.reconnectAttempts);
    }
  }

  async sendScriptList() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    try {
      // Essayer d'obtenir les scripts enregistrés
      let scripts = [];
      
      if (chrome.scripting && typeof chrome.scripting.getAllScripts === 'function') {
        try {
          scripts = await chrome.scripting.getAllScripts();
        } catch (error) {
          console.log('Could not get scripts:', error);
        }
      }
      
      // Alternative: essayer chrome.userScripts
      if (scripts.length === 0 && chrome.userScripts) {
        try {
          const userScripts = await chrome.userScripts.getScripts();
          scripts = userScripts.map(script => ({
            id: script.id,
            name: script.name || 'Unknown Script',
            code: script.code || '',
            meta: {},
            updated: Date.now()
          }));
        } catch (error) {
          console.log('Could not get user scripts:', error);
        }
      }
      
      // Si toujours pas de scripts, envoyer un message vide
      const scriptList = scripts.map(script => ({
        id: script.id,
        name: script.name || 'Unknown Script',
        code: script.code || script.function?.toString() || '',
        meta: script.meta || {},
        updated: Date.now()
      }));

      this.ws.send(JSON.stringify({
        type: 'script_list',
        data: scriptList,
        timestamp: Date.now()
      }));
      
      console.log('Sent script list to VS Code:', scriptList.length, 'scripts');
    } catch (error) {
      console.error('Error getting scripts:', error);
    }
  }

  handleVSCodeMessage(message) {
    console.log('Received message from VS Code:', message.type);

    switch (message.type) {
      case 'script_update':
        this.updateScript(message.data?.script);
        break;
      case 'script_delete':
        this.deleteScript(message.data?.scriptId);
        break;
      case 'sync_all':
        this.sendScriptList();
        break;
    }
  }

  async updateScript(scriptInfo) {
    if (!scriptInfo?.id) return;

    try {
      // Essayer d'abord chrome.scripting
      if (chrome.scripting && typeof chrome.scripting.registerScript === 'function') {
        const functionBody = scriptInfo.code.replace(/^function.*?\{/, '').replace(/\}$/, '');
        const func = new Function(functionBody);
        
        await chrome.scripting.registerScript({
          id: scriptInfo.id,
          func: func,
          meta: scriptInfo.meta || {},
          target: { hostPermissions: ['<all_urls>'] }
        });
      }
      // Alternative: chrome.userScripts
      else if (chrome.userScripts && typeof chrome.userScripts.register === 'function') {
        await chrome.userScripts.register({
          id: scriptInfo.id,
          name: scriptInfo.name,
          code: scriptInfo.code
        });
      }
      
      console.log('Script updated from VS Code:', scriptInfo.name);
    } catch (error) {
      console.error('Error updating script:', error);
    }
  }

  async deleteScript(scriptId) {
    if (!scriptId) return;

    try {
      // Essayer d'abord chrome.scripting
      if (chrome.scripting && typeof chrome.scripting.unregisterScript === 'function') {
        await chrome.scripting.unregisterScript({ ids: [scriptId] });
      }
      // Alternative: chrome.userScripts
      else if (chrome.userScripts && typeof chrome.userScripts.unregister === 'function') {
        await chrome.userScripts.unregister(scriptId);
      }
      
      console.log('Script deleted:', scriptId);
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  }
}

// Initialiser la synchronisation
let vscodeSync;

chrome.runtime.onStartup.addListener(() => {
  vscodeSync = new VSCodeSync();
});

chrome.runtime.onInstalled.addListener(() => {
  vscodeSync = new VSCodeSync();
});

// Garder le service worker en vie et réessayer la connexion périodiquement
setInterval(() => {
  if (vscodeSync && (!vscodeSync.ws || vscodeSync.ws.readyState !== WebSocket.OPEN)) {
    vscodeSync.initConnection();
  }
}, 15000);

console.log('ScriptCat Sync Service Worker started');