// JavaScript séparé pour éviter les erreurs CSP
// popup.js - Version améliorée avec logs détaillés

// Variables globales
let status = null;
let connectBtn = null;
let syncBtn = null;
let clearLogs = null;
let logs = null;
let localCount = null;
let wsStatus = null;
let lastActivity = null;
let ws = null;
let reconnectAttempts = 0;
let isConnected = false;

// Fonctions utilitaires avec logs détaillés
function addLog(message, type = 'info') {
  if (!logs) {
    console.log(`[POPUP:${type.toUpperCase()}] ${message}`);
    return;
  }
  const logDiv = document.createElement('div');
  logDiv.className = `log-entry log-${type}`;
  
  const timestamp = new Date().toLocaleTimeString();
  logDiv.innerHTML = `
    <span class="log-time">[${timestamp}]</span> 
    <span class="log-message">${message}</span>
  `;
  
  logs.appendChild(logDiv);
  logs.scrollTop = logs.scrollHeight;
  
  // Garder seulement les 50 derniers logs
  while (logs.children.length > 50) {
    logs.removeChild(logs.firstChild);
  }
  
  // Logs détaillés dans la console
  console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

function updateStatus(connected, message = '') {
  isConnected = connected;
  
  if (connected) {
    status.className = 'status connected';
    status.textContent = 'Connected to VS Code';
    connectBtn.textContent = 'Disconnect';
    wsStatus.textContent = 'Connected';
    lastActivity.textContent = new Date().toLocaleTimeString();
  } else {
    status.className = 'status disconnected';
    status.textContent = message || 'Not connected to VS Code';
    connectBtn.textContent = 'Connect to VS Code';
    wsStatus.textContent = 'Disconnected';
  }
}

function updateStats() {
  // Simuler le compte de scripts locaux
  chrome.storage.local.get('scriptCount', (data) => {
    localCount.textContent = data.scriptCount || 0;
  });
}

// Gestionnaire de connexion avec logs détaillés
function connect() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    addLog('Closing existing connection...', 'info');
    ws.close();
    return;
  }
  
  // Changer le statut immédiatement
  updateStatus(false, 'Connecting...');
  addLog('Attempting connection to VS Code...', 'info');
  addLog('Target: ws://localhost:8643', 'info');
  
  try {
    addLog('Creating WebSocket object...', 'info');
    ws = new WebSocket('ws://localhost:8643');
    addLog(`WebSocket created, readyState: ${ws.readyState}`, 'info');
    
    ws.onopen = () => {
      addLog('✅ WebSocket connection established!', 'success');
      addLog(`WebSocket readyState: OPEN`, 'success');
      updateStatus(true);
      reconnectAttempts = 0;
      lastActivity.textContent = new Date().toLocaleTimeString();
    };
    
    ws.onmessage = (event) => {
      addLog('📨 Message received from VS Code', 'info');
      try {
        const data = JSON.parse(event.data);
        addLog(`Message type: ${data.type}`, 'info');
        addLog(`Message data length: ${JSON.stringify(data).length} bytes`, 'info');
        lastActivity.textContent = new Date().toLocaleTimeString();
        
        if (data.type === 'script_list') {
          addLog(`📦 Script list received: ${data.data.length} scripts`, 'success');
          addLog(`Script details: ${data.data.map(s => s.name).join(', ')}`, 'info');
          chrome.storage.local.set({ scriptCount: data.data.length });
          updateStats();
        }
        
      } catch (error) {
        addLog('❌ Error parsing message: ' + error.message, 'error');
        addLog(`Raw message: ${event.data.substring(0, 100)}...`, 'info');
      }
    };
    
    ws.onclose = (event) => {
      addLog('🔌 WebSocket connection closed', 'error');
      addLog(`Close code: ${event.code}, reason: ${event.reason}`, 'info');
      addLog(`Was clean: ${event.wasClean}`, 'info');
      updateStatus(false);
      scheduleReconnect();
    };
    
    ws.onerror = (error) => {
      addLog('❌ WebSocket error occurred', 'error');
      addLog(`Error details: ${error}`, 'info');
      updateStatus(false);
    };
    
  } catch (error) {
    addLog('❌ Connection failed: ' + error.message, 'error');
    addLog(`Error stack: ${error.stack}`, 'info');
    updateStatus(false);
    scheduleReconnect();
  }
}

// Gestion de la reconnexion
function scheduleReconnect() {
  if (reconnectAttempts < 5) {
    reconnectAttempts++;
    addLog(`Next attempt in ${reconnectAttempts * 2}s...`, 'info');
    
    setTimeout(() => {
      addLog(`Reconnection attempt (${reconnectAttempts}/5)`, 'info');
      connect();
    }, 2000 * reconnectAttempts);
  } else {
    addLog('Max attempts reached. Manual reconnect required.', 'error');
  }
}

// Initialisation des éléments DOM et event listeners
function initializeDOM() {
  // Récupérer les éléments DOM
  status = document.getElementById('status');
  connectBtn = document.getElementById('connectBtn');
  syncBtn = document.getElementById('syncBtn');
  clearLogs = document.getElementById('clearLogs');
  logs = document.getElementById('logs');
  localCount = document.getElementById('localCount');
  wsStatus = document.getElementById('wsStatus');
  lastActivity = document.getElementById('lastActivity');
  
  // Vérifier que tous les éléments sont présents
  if (!status || !connectBtn || !syncBtn || !clearLogs || !logs || 
      !localCount || !wsStatus || !lastActivity) {
    addLog('❌ ERROR: Some DOM elements not found!', 'error');
    return;
  }
  
  addLog('✅ All DOM elements loaded successfully', 'success');
  
  // Attacher les event listeners
  connectBtn.addEventListener('click', connect);
  syncBtn.addEventListener('click', syncAll);
  clearLogs.addEventListener('click', () => {
    logs.innerHTML = '<div class="log-entry log-info"><span class="log-time">[Logs cleared]</span> Logs cleared manually</div>';
  });
  
  addLog('✅ Event listeners attached', 'success');
}

// Synchronisation manuelle
function syncAll() {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    addLog('Not connected to VS Code', 'error');
    return;
  }
  
  ws.send(JSON.stringify({
    type: 'sync_all',
    timestamp: Date.now()
  }));
  
  addLog('Sync request sent', 'info');
}

// Initialisation avec logs détaillés
function initialize() {
  // Initialiser les éléments DOM et event listeners
  initializeDOM();
  addLog('🚀 Starting popup initialization...', 'info');
  
  updateStats();
  
  // Tentative de connexion automatique après 1s
  addLog('⏳ Scheduling automatic connection in 1s...', 'info');
  setTimeout(() => {
    addLog('🔄 Starting automatic connection attempt...', 'info');
    connect();
  }, 1000);
  
  // Mise à jour périodique des stats
  addLog('⏰ Starting stats update interval (5s)', 'info');
  setInterval(updateStats, 5000);
  
  // Nettoyage à la fermeture
  window.addEventListener('beforeunload', () => {
    addLog('🚫 Popup closing, cleaning up...', 'info');
    if (ws) {
      ws.close();
    }
  });
  
  addLog('✅ Popup initialization complete', 'success');
}

// Démarrer l'initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

// Si DOMContentLoaded ne se déclenche pas, essayer window.onload
window.addEventListener('load', () => {
  addLog('Window load event fired', 'info');
  if (!connectBtn) {
    addLog('DOM elements not found, initializing manually...', 'info');
    initialize();
  }
});
