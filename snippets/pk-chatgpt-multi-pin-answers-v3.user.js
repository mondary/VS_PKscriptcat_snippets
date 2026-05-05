// ==UserScript==
// @name         ChatGPT Multi-Pin Réponses v3
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Épinglez plusieurs réponses par conversation ChatGPT avec regroupement par conversation et navigation.
// @author       cmondary
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const LS_KEY = 'chatgpt-multi-pinned-answers';
    const PANEL_ID = 'multi-pinned-answers-panel';
    const BTN_CLASS = 'multi-pin-btn';
    const UNPIN_BTN_CLASS = 'multi-unpin-btn';
    const FLOAT_BTN_ID = 'open-multi-pin-panel';

    // Utilitaires
    function getConvId() {
        const m = location.pathname.match(/\/c\/([a-zA-Z0-9\-]+)/);
        return m ? m[1] : null;
    }
    
    function getPinned() {
        try {
            return JSON.parse(localStorage.getItem(LS_KEY)) || {};
        } catch { return {}; }
    }
    
    function setPinned(obj) {
        localStorage.setItem(LS_KEY, JSON.stringify(obj));
    }

    function getConversationTitle(convId) {
        // Essaie de récupérer le titre de la conversation depuis l'historique
        const historyItems = document.querySelectorAll('nav a[href*="/c/"]');
        const matchingItem = Array.from(historyItems).find(item => 
            item.getAttribute('href').includes(`/c/${convId}`)
        );
        
        if (matchingItem) {
            const titleElement = matchingItem.querySelector('div');
            return titleElement ? titleElement.textContent.trim() : `Conversation ${convId.substring(0, 8)}`;
        }
        
        return `Conversation ${convId.substring(0, 8)}`;
    }

    // SVG pour le bouton épingle sur chaque réponse
    const SVG_PIN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12V4a4 4 0 00-8 0v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2zm-4 8l-1.5-1.5L9 17v-1h6v1l-1.5 1.5L12 20z" fill="currentColor"/>
    </svg>`;

    // SVG pour le bouton flottant (icône archive/panneau)
    const SVG_ARCHIVE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h18v4H3V3zm0 6h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9zm6 3h6v2H9v-2z" fill="currentColor"/>
    </svg>`;

    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // Ajoute le bouton épingle à chaque réponse
    function addPinButtons() {
        const convId = getConvId();
        if (!convId) return;
        
        const pinned = getPinned()[convId] || [];
        // Sélecteur plus robuste pour les réponses de ChatGPT
        const answers = document.querySelectorAll('[data-message-author-role="assistant"] .markdown, .group\/conversation-turn .markdown, [class*="markdown"] .prose, .text-base .markdown');
        
        answers.forEach((msg, idx) => {
            if (msg.getAttribute('data-multi-pin-checked')) return;
            msg.setAttribute('data-multi-pin-checked', '1');
            if (msg.querySelector('.multi-pin-btn')) return;
            
            // Crée le bouton
            const btn = document.createElement('button');
            btn.className = 'multi-pin-btn';
            btn.title = 'Épingler cette réponse';
            btn.style.cssText = `
                margin-left: 8px;
                cursor: pointer;
                background: none;
                border: none;
                vertical-align: middle;
                padding: 6px;
                width: 32px;
                height: 32px;
                border-radius: 8px;
                transition: all 0.2s;
                color: var(--text-tertiary, #888);
                display: inline-flex;
                align-items: center;
                justify-content: center;
            `;
            btn.innerHTML = SVG_PIN;
            
            // Si déjà épinglé, change l'apparence
            if (pinned.some(p => p.index === idx && p.text === msg.innerText)) {
                btn.style.opacity = '0.5';
                btn.style.color = 'var(--text-primary, #333)';
                btn.title = 'Déjà épinglée';
            }
            
            btn.onmouseenter = () => { 
                btn.style.background = 'var(--token-sidebar-surface-secondary, #f0f0f0)';
                btn.style.transform = 'scale(1.05)';
            };
            btn.onmouseleave = () => { 
                btn.style.background = 'none';
                btn.style.transform = 'scale(1)';
            };
            btn.onclick = (e) => {
                e.stopPropagation();
                const pinnedAll = getPinned();
                const arr = pinnedAll[convId] || [];
                if (arr.some(p => p.index === idx && p.text === msg.innerText)) return;
                
                // Capture du contenu avec gestion des sources
                const fullText = msg.innerText;
                const htmlContent = msg.innerHTML;
                
                // Recherche des liens sources
                const sourceLinks = [];
                const links = msg.querySelectorAll('a[href]');
                links.forEach(link => {
                    if (link.textContent.toLowerCase().includes('source') || 
                        link.href.includes('source') || 
                        link.getAttribute('data-source')) {
                        sourceLinks.push({
                            text: link.textContent,
                            href: link.href,
                            title: link.title || link.textContent
                        });
                    }
                });
                
                arr.push({ 
                    index: idx, 
                    text: fullText,
                    html: htmlContent,
                    sources: sourceLinks,
                    timestamp: Date.now(),
                    preview: fullText.substring(0, 200) + '...'
                });
                pinnedAll[convId] = arr;
                setPinned(pinnedAll);
                showPanel();
                
                btn.style.opacity = '0.5';
                btn.style.color = 'var(--text-primary, #333)';
                btn.title = 'Déjà épinglée';
            };
            
            // Ajoute le bouton à la réponse
            msg.appendChild(btn);
        });
    }

    // Affiche le panneau latéral avec regroupement par conversation
    function showPanel() {
        let panel = document.getElementById(PANEL_ID);
        if (!panel) {
            panel = document.createElement('div');
            panel.id = PANEL_ID;
            panel.style.cssText = `
                position: fixed;
                top: 0;
                right: 0;
                width: 400px;
                height: 100vh;
                background: var(--token-main-surface-primary, #fff);
                border-left: 1px solid var(--token-border-medium, #e0e0e0);
                box-shadow: -4px 0 24px rgba(0,0,0,0.1);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                font-size: 14px;
                transition: transform 0.3s ease;
            `;
            
            // Adaptation mode sombre
            if (isDarkMode()) {
                panel.style.background = 'var(--token-main-surface-primary, #2c2c2c)';
                panel.style.borderLeft = '1px solid var(--token-border-medium, #444)';
            }
            
            document.body.appendChild(panel);
        }
        
        const allPinned = getPinned();
        const totalMessages = Object.values(allPinned).reduce((sum, arr) => sum + arr.length, 0);

        // En-tête du panneau
        let html = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border-bottom: 1px solid var(--token-border-light, #e8e8e8);
                background: var(--token-main-surface-secondary, #f8f9fa);
            ">
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 600;
                    font-size: 16px;
                    color: var(--text-primary, #333);
                ">
                    ${SVG_ARCHIVE}
                    <span>Réponses épinglées</span>
                    <span style="
                        background: var(--token-main-surface-tertiary, #e8e8e8);
                        color: var(--text-primary, #333);
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 500;
                    ">${totalMessages}</span>
                </div>
                <button id="close-multi-pin-panel" style="
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: var(--text-tertiary, #888);
                    padding: 8px;
                    border-radius: 6px;
                    transition: all 0.2s;
                " onmouseover="this.style.background='var(--token-surface-secondary, #f0f0f0)'" onmouseout="this.style.background='none'">
                    ✕
                </button>
            </div>
        `;

        // Contenu du panneau
        html += `<div style="
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        ">`;

        if (Object.keys(allPinned).length === 0) {
            html += `
                <div style="
                    text-align: center;
                    color: var(--text-tertiary, #888);
                    padding: 40px 20px;
                    font-size: 15px;
                ">
                    <div style="margin-bottom: 12px; font-size: 48px; opacity: 0.5;">📋</div>
                    <div>Aucune réponse épinglée</div>
                    <div style="font-size: 13px; margin-top: 8px;">
                        Cliquez sur l'icône épingle à côté des réponses pour les sauvegarder ici.
                    </div>
                </div>
            `;
        } else {
            // Regroupement par conversation
            Object.entries(allPinned).forEach(([convId, messages]) => {
                if (messages.length === 0) return;
                
                const convTitle = getConversationTitle(convId);
                html += `
                    <div style="margin-bottom: 24px;">
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-weight: 600;
                            font-size: 15px;
                            color: var(--text-primary, #333);
                            margin-bottom: 12px;
                            padding: 8px 12px;
                            background: var(--token-main-surface-secondary, #f8f9fa);
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.2s;
                        " onclick="scrollToConversation('${convId}')" onmouseover="this.style.background='var(--token-surface-tertiary, #e8e8e8)'" onmouseout="this.style.background='var(--token-main-surface-secondary, #f8f9fa)'">
                            <span>${convTitle}</span>
                            <span style="
                                background: var(--token-main-surface-tertiary, #e8e8e8);
                                color: var(--text-secondary, #666);
                                padding: 2px 6px;
                                border-radius: 10px;
                                font-size: 11px;
                                font-weight: 500;
                            ">${messages.length}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px; margin-left: 16px;">
                `;

                messages.forEach((p, i) => {
                    const date = new Date(p.timestamp || Date.now()).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    
                    html += `
                        <div style="
                            position: relative;
                            background: var(--token-surface-secondary, #f8f9fa);
                            border: 1px solid var(--token-border-light, #e8e8e8);
                            border-radius: 8px;
                            padding: 12px;
                            transition: all 0.2s;
                            cursor: pointer;
                        " onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'" onclick="scrollToMessage('${convId}', ${i})">
                            <button class="${UNPIN_BTN_CLASS}" data-conv-id="${convId}" data-idx="${i}" title="Supprimer cette épingle" style="
                                position: absolute;
                                top: 6px;
                                right: 6px;
                                background: none;
                                border: none;
                                cursor: pointer;
                                font-size: 14px;
                                color: var(--text-tertiary, #888);
                                padding: 2px;
                                border-radius: 4px;
                                transition: all 0.2s;
                            " onmouseover="this.style.background='var(--token-surface-tertiary, #e8e8e8)'; this.style.color='var(--text-danger, #dc2626)'" onmouseout="this.style.background='none'; this.style.color='var(--text-tertiary, #888)'">
                                ✕
                            </button>
                            <div style="
                                font-size: 11px;
                                color: var(--text-tertiary, #888);
                                margin-bottom: 6px;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            ">
                                <span>${date}</span>
                            </div>
                            <div style="
                                color: var(--text-primary, #333);
                                line-height: 1.4;
                                font-size: 13px;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                margin-bottom: 8px;
                            ">
                                ${p.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}
                            </div>
                            ${p.sources && p.sources.length > 0 ? `
                                <div style="
                                    margin-top: 8px;
                                    padding-top: 8px;
                                    border-top: 1px solid var(--token-border-light, #e8e8e8);
                                    display: flex;
                                    flex-wrap: wrap;
                                    gap: 6px;
                                ">
                                    ${p.sources.map(source => `
                                        <a href="${source.href}" target="_blank" rel="noopener noreferrer" 
                                           title="${source.title}"
                                           style="
                                               display: inline-flex;
                                               align-items: center;
                                               gap: 4px;
                                               background: var(--token-main-surface-tertiary, #e8e8e8);
                                               color: var(--text-primary, #333);
                                               padding: 4px 8px;
                                               border-radius: 12px;
                                               text-decoration: none;
                                               font-size: 11px;
                                               font-weight: 500;
                                               transition: all 0.2s;
                                           "
                                           onmouseover="this.style.background='var(--token-surface-tertiary, #d0d0d0)'"
                                           onmouseout="this.style.background='var(--token-main-surface-tertiary, #e8e8e8)'"
                                        >
                                            🔗 ${source.text}
                                        </a>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            });
        }

        html += '</div>';
        panel.innerHTML = html;
        
        // Gestion fermeture panneau
        panel.querySelector('#close-multi-pin-panel').onclick = () => panel.remove();
        
        // Gestion désépinglage
        panel.querySelectorAll('.' + UNPIN_BTN_CLASS).forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const convId = btn.getAttribute('data-conv-id');
                const idx = parseInt(btn.getAttribute('data-idx'));
                const pinnedAll = getPinned();
                const arr = pinnedAll[convId] || [];
                arr.splice(idx, 1);
                if (arr.length === 0) {
                    delete pinnedAll[convId];
                } else {
                    pinnedAll[convId] = arr;
                }
                setPinned(pinnedAll);
                showPanel();
                updateFloatingBtnBadge();
            };
        });
    }

    // Ajoute le bouton flottant en bas à droite
    function addFloatingPanelBtn() {
        if (document.getElementById(FLOAT_BTN_ID)) return;
        
        const btn = document.createElement('button');
        btn.id = FLOAT_BTN_ID;
        btn.title = 'Ouvrir le panneau des réponses épinglées';
        btn.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            background: var(--token-main-surface-primary, #fff);
            border: 1px solid var(--token-border-medium, #d0d0d0);
            border-radius: 50%;
            width: 56px;
            height: 56px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            color: var(--text-primary, #333);
        `;
        
        btn.innerHTML = SVG_ARCHIVE;
        
        btn.onmouseenter = () => {
            btn.style.transform = 'scale(1.1)';
            btn.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
            btn.style.background = 'var(--token-main-surface-secondary, #f8f9fa)';
        };
        btn.onmouseleave = () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            btn.style.background = 'var(--token-main-surface-primary, #fff)';
        };
        btn.onclick = showPanel;
        
        document.body.appendChild(btn);
        
        // Ajoute un badge avec le nombre d'éléments épinglés
        updateFloatingBtnBadge();
    }

    // Met à jour le badge du bouton flottant
    function updateFloatingBtnBadge() {
        const btn = document.getElementById(FLOAT_BTN_ID);
        if (!btn) return;
        
        const allPinned = getPinned();
        const totalCount = Object.values(allPinned).reduce((sum, arr) => sum + arr.length, 0);
        
        let badge = btn.querySelector('.pin-badge');
        if (totalCount > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'pin-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: var(--text-danger, #dc2626);
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 600;
                    border: 2px solid var(--token-main-surface-primary, #fff);
                `;
                btn.appendChild(badge);
            }
            badge.textContent = totalCount;
        } else if (badge) {
            badge.remove();
        }
    }

    // Fonction pour naviguer vers une conversation
    window.scrollToConversation = function(convId) {
        if (location.pathname !== `/c/${convId}`) {
            location.href = `/c/${convId}`;
        }
    };

    // Fonction pour naviguer vers un message épinglé
    window.scrollToMessage = function(convId, index) {
        const currentConvId = getConvId();
        
        if (currentConvId !== convId) {
            // Naviguer vers la conversation
            location.href = `/c/${convId}`;
            return;
        }
        
        const pinned = getPinned()[convId] || [];
        const pinnedItem = pinned[index];
        
        if (!pinnedItem) return;

        // Attendre que la conversation soit chargée
        setTimeout(() => {
            const messages = document.querySelectorAll('[data-message-author-role="assistant"] .markdown, .group\/conversation-turn .markdown, [class*="markdown"] .prose, .text-base .markdown');
            const targetMessage = Array.from(messages).find(msg => 
                msg.innerText === pinnedItem.text
            );
            
            if (targetMessage) {
                // Scroll vers le message avec un effet fluide
                targetMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Surligne temporairement le message
                const originalBg = targetMessage.style.backgroundColor;
                const originalTransition = targetMessage.style.transition;
                
                targetMessage.style.transition = 'background-color 0.3s ease';
                targetMessage.style.backgroundColor = 'var(--token-main-surface-secondary, #f0f0f0)';
                
                setTimeout(() => {
                    targetMessage.style.backgroundColor = originalBg;
                    setTimeout(() => {
                        targetMessage.style.transition = originalTransition;
                    }, 300);
                }, 1500);
            }
        }, currentConvId === convId ? 100 : 1000);
    };

    // Rafraîchit tout, throttle 800ms
    let lastRefresh = 0;
    function refresh() {
        const now = Date.now();
        if (now - lastRefresh < 800) return;
        lastRefresh = now;
        addPinButtons();
        addFloatingPanelBtn();
        updateFloatingBtnBadge();
    }

    // Observe uniquement la zone des messages
    function getMessagesContainer() {
        return document.querySelector('main') || document.body;
    }
    
    let refreshTimeout = null;
    function observeMessages() {
        const container = getMessagesContainer();
        if (!container) return;
        const observer = new MutationObserver(() => {
            if (refreshTimeout) clearTimeout(refreshTimeout);
            refreshTimeout = setTimeout(refresh, 500);
        });
        observer.observe(container, { childList: true, subtree: true });
    }

    // Observe les changements de mode sombre
    function watchDarkMode() {
        const observer = new MutationObserver(() => {
            const panel = document.getElementById(PANEL_ID);
            if (panel) {
                if (isDarkMode()) {
                    panel.style.background = 'var(--token-main-surface-primary, #2c2c2c)';
                    panel.style.borderLeft = '1px solid var(--token-border-medium, #444)';
                } else {
                    panel.style.background = 'var(--token-main-surface-primary, #fff)';
                    panel.style.borderLeft = '1px solid var(--token-border-medium, #e0e0e0)';
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    // Initialisation
    refresh();
    observeMessages();
    watchDarkMode();

    // Gestion des raccourcis clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const panel = document.getElementById(PANEL_ID);
            if (panel) panel.remove();
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            showPanel();
        }
    });

})();
