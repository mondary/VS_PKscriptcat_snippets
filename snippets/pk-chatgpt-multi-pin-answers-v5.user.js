// ==UserScript==
// @name         ChatGPT Multi-Pin Réponses v5
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Épinglez plusieurs réponses par conversation ChatGPT avec navigation simple vers la conversation.
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

    // Fonction pour trouver les réponses de ChatGPT avec différentes stratégies
    function findChatGPTAnswers() {
        // Stratégie 1: Utiliser les attributs data-message-author-role
        let answers = document.querySelectorAll('[data-message-author-role="assistant"]');
        
        // Stratégie 2: Chercher dans les conteneurs de conversation
        if (answers.length === 0) {
            answers = document.querySelectorAll('div[class*="group"]:has(div[class*="markdown"]), div[class*="conversation-turn"]:has(div[class*="markdown"])');
        }
        
        // Stratégie 3: Chercher directement les conteneurs markdown
        if (answers.length === 0) {
            answers = document.querySelectorAll('div[class*="markdown"] .prose, .text-base .markdown');
        }
        
        // Stratégie 4: Fallback - chercher des patterns de réponse
        if (answers.length === 0) {
            answers = document.querySelectorAll('div[class*="min-h-"]:has(div[class*="markdown"]), div[class*="group"]:has(p), main div:has(pre)');
        }
        
        return Array.from(answers).filter(el => {
            // Filtrer les éléments vides ou trop petits
            const text = el.innerText?.trim();
            return text && text.length > 10;
        });
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
        const answers = findChatGPTAnswers();
        
        answers.forEach((msg, idx) => {
            if (msg.getAttribute('data-multi-pin-checked')) return;
            msg.setAttribute('data-multi-pin-checked', '1');
            if (msg.querySelector('.multi-pin-btn')) return;
            
            // Trouve le meilleur conteneur pour le contenu
            const contentContainer = msg.querySelector('.markdown, .prose, [class*="markdown"]') || msg;
            
            // Crée le bouton
            const btn = document.createElement('button');
            btn.className = 'multi-pin-btn';
            btn.title = 'Épingler cette réponse';
            btn.style.cssText = `
                position: relative;
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
                z-index: 1000;
            `;
            btn.innerHTML = SVG_PIN;
            
            // Si déjà épinglé, change l'apparence
            if (pinned.some(p => p.index === idx && p.text === contentContainer.innerText)) {
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
                const fullText = contentContainer.innerText;
                
                if (arr.some(p => p.index === idx && p.text === fullText)) return;
                
                // Capture du contenu simplifié
                arr.push({ 
                    index: idx, 
                    text: fullText,
                    timestamp: Date.now(),
                    preview: fullText.substring(0, 150) + '...'
                });
                pinnedAll[convId] = arr;
                setPinned(pinnedAll);
                showPanel();
                
                btn.style.opacity = '0.5';
                btn.style.color = 'var(--text-primary, #333)';
                btn.title = 'Déjà épinglée';
            };
            
            // Ajoute le bouton à la réponse - essaie différentes positions
            const targetContainer = contentContainer.closest('[data-message-author-role="assistant"]') || 
                                   contentContainer.closest('.group') || 
                                   contentContainer.parentElement ||
                                   contentContainer;
            
            if (targetContainer) {
                targetContainer.style.position = 'relative';
                btn.style.position = 'absolute';
                btn.style.top = '8px';
                btn.style.right = '8px';
                targetContainer.appendChild(btn);
            }
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
                        " data-conv-id="${convId}" data-action="navigate-conv" onmouseover="this.style.background='var(--token-surface-tertiary, #e8e8e8)'" onmouseout="this.style.background='var(--token-main-surface-secondary, #f8f9fa)'"
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
                        <div style="display: flex; flex-direction: column; gap: 12px; margin-left: 16px;">
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
                            padding: 16px;
                            transition: all 0.2s;
                            cursor: pointer;
                        " data-conv-id="${convId}" data-index="${i}" data-action="navigate-msg" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'"
                            <button class="${UNPIN_BTN_CLASS}" data-conv-id="${convId}" data-idx="${i}" title="Supprimer cette épingle" style="
                                position: absolute;
                                top: 8px;
                                right: 8px;
                                background: none;
                                border: none;
                                cursor: pointer;
                                font-size: 14px;
                                color: var(--text-tertiary, #888);
                                padding: 4px;
                                border-radius: 4px;
                                transition: all 0.2s;
                                z-index: 1001;
                            " onmouseover="this.style.background='var(--token-surface-tertiary, #e8e8e8)'; this.style.color='var(--text-danger, #dc2626)'" onmouseout="this.style.background='none'; this.style.color='var(--text-tertiary, #888)'">
                                ✕
                            </button>
                            <div style="
                                font-size: 11px;
                                color: var(--text-tertiary, #888);
                                margin-bottom: 8px;
                                display: flex;
                                align-items: center;
                                gap: 6px;
                            ">
                                <span>📅 ${date}</span>
                            </div>
                            <div style="
                                color: var(--text-primary, #333);
                                line-height: 1.5;
                                font-size: 13px;
                                display: -webkit-box;
                                -webkit-line-clamp: 4;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            ">
                                ${p.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}
                            </div>
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
        
        // Gestion navigation vers conversation
        panel.querySelectorAll('[data-action="navigate-conv"]').forEach(element => {
            element.onclick = (e) => {
                e.preventDefault();
                const convId = element.getAttribute('data-conv-id');
                navigateToConversation(convId);
            };
        });
        
        // Gestion navigation vers message spécifique
        panel.querySelectorAll('[data-action="navigate-msg"]').forEach(element => {
            element.onclick = (e) => {
                e.preventDefault();
                const convId = element.getAttribute('data-conv-id');
                const index = parseInt(element.getAttribute('data-index'));
                navigateToMessage(convId, index);
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
    window.navigateToConversation = function(convId) {
        if (location.pathname !== `/c/${convId}`) {
            location.href = `/c/${convId}`;
        }
    };

    // Fonction pour naviguer vers un message épinglé
    window.navigateToMessage = function(convId, index) {
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
            const messages = findChatGPTAnswers();
            const targetMessage = messages.find(msg => 
                msg.innerText?.trim() === pinnedItem.text.trim()
            );
            
            if (targetMessage) {
                // Calcul de la position optimale pour le scroll
                const rect = targetMessage.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const headerHeight = 60; // Hauteur approximative de l'en-tête ChatGPT
                
                // Position cible : 1/4 depuis le haut de la fenêtre
                const targetY = viewportHeight / 4;
                const scrollY = window.scrollY + rect.top - targetY - headerHeight;
                
                // Scroll vers la position calculée
                window.scrollTo({
                    top: scrollY,
                    behavior: 'smooth'
                });
                
                // Surligne temporairement le message
                const originalBg = targetMessage.style.backgroundColor;
                const originalTransition = targetMessage.style.transition;
                const originalBorder = targetMessage.style.border;
                
                targetMessage.style.transition = 'all 0.3s ease';
                targetMessage.style.backgroundColor = 'var(--token-main-surface-secondary, #f0f0f0)';
                targetMessage.style.border = '2px solid var(--text-primary, #007acc)';
                targetMessage.style.borderRadius = '8px';
                
                setTimeout(() => {
                    targetMessage.style.backgroundColor = originalBg;
                    targetMessage.style.border = originalBorder;
                    setTimeout(() => {
                        targetMessage.style.transition = originalTransition;
                    }, 300);
                }, 2000);
            }
        }, currentConvId === convId ? 200 : 1500);
    };

    // Rafraîchit tout, throttle 1000ms
    let lastRefresh = 0;
    function refresh() {
        const now = Date.now();
        if (now - lastRefresh < 1000) return;
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
            refreshTimeout = setTimeout(refresh, 800);
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
