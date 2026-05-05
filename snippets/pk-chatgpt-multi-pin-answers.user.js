// ==UserScript==
// @name         ChatGPT Multi-Pin Réponses
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Épinglez plusieurs réponses par conversation ChatGPT et retrouvez-les dans un panneau à droite. Interface française.
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

    // SVG punaise style sidebar-pin (couleur héritée)
    const SVG_PIN = `<svg class="h-5 w-5 shrink-0" width="24" height="24" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="125 125 774 774" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M631.637333 178.432a64 64 0 0 1 19.84 13.504l167.616 167.786667a64 64 0 0 1-19.370666 103.744l-59.392 26.304-111.424 111.552-8.832 122.709333a64 64 0 0 1-109.098667 40.64l-108.202667-108.309333-184.384 185.237333-45.354666-45.162667 184.490666-185.344-111.936-112.021333a64 64 0 0 1 40.512-109.056l126.208-9.429333 109.44-109.568 25.706667-59.306667a64 64 0 0 1 84.181333-33.28z m-25.450666 58.730667l-30.549334 70.464-134.826666 135.04-149.973334 11.157333 265.408 265.6 10.538667-146.474667 136.704-136.874666 70.336-31.146667-167.637333-167.765333z"  /></svg>`;

    // SVG pour le bouton flottant (punaise stylée)
    const SVG_FLOAT_PIN = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 3L21 7L17 11M21 7H9.5C7.01472 7 5 9.01472 5 11.5V13.5C5 15.9853 7.01472 18 9.5 18H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // Ajoute le bouton épingle à chaque réponse
    function addPinButtons() {
        const convId = getConvId();
        if (!convId) return;
        const pinned = getPinned()[convId] || [];
        const answers = document.querySelectorAll('[class*="min-h-\\[46px\\]"] > div');
        answers.forEach((msg, idx) => {
            if (msg.getAttribute('data-multi-pin-checked')) return;
            msg.setAttribute('data-multi-pin-checked', '1');
            if (msg.querySelector('.multi-pin-btn')) return;
            // Crée le bouton
            const btn = document.createElement('button');
            btn.className = 'multi-pin-btn';
            btn.title = 'Épingler cette réponse';
            btn.style.marginLeft = '8px';
            btn.style.cursor = 'pointer';
            btn.style.background = 'none';
            btn.style.border = 'none';
            btn.style.verticalAlign = 'middle';
            btn.style.padding = '5px 3px';
            btn.style.width = '28px';
            btn.style.height = '31px';
            btn.style.borderRadius = '8px';
            btn.style.transition = 'background 0.2s';
            btn.style.color = 'var(--text-tertiary, #888)';
            btn.innerHTML = SVG_PIN;
            // Si déjà épinglé, grise la punaise
            if (pinned.some(p => p.index === idx && p.text === msg.innerText)) {
                btn.style.opacity = '0.5';
                btn.title = 'Déjà épinglée';
            }
            btn.onmouseenter = () => { btn.style.background = 'var(--token-sidebar-surface-secondary, #eee)'; };
            btn.onmouseleave = () => { btn.style.background = 'none'; };
            btn.onclick = (e) => {
                e.stopPropagation();
                const pinnedAll = getPinned();
                const arr = pinnedAll[convId] || [];
                if (arr.some(p => p.index === idx && p.text === msg.innerText)) return;
                arr.push({ index: idx, text: msg.innerText });
                pinnedAll[convId] = arr;
                setPinned(pinnedAll);
                showPanel();
                btn.style.opacity = '0.5';
                btn.title = 'Déjà épinglée';
            };
            // Ajoute le bouton à la réponse
            msg.appendChild(btn);
        });
    }

    // Affiche le panneau latéral avec la liste des réponses épinglées (style pinARCHIVE)
    function showPanel() {
        let panel = document.getElementById(PANEL_ID);
        if (!panel) {
            panel = document.createElement('div');
            panel.id = PANEL_ID;
            panel.style.position = 'fixed';
            panel.style.top = '70px';
            panel.style.right = '0';
            panel.style.width = '370px';
            panel.style.maxWidth = '95vw';
            panel.style.background = 'var(--token-main-surface-primary, #fff)';
            panel.style.borderLeft = '1.5px solid #e0e0e0';
            panel.style.boxShadow = '-4px 0 24px 0 rgba(0,0,0,0.10)';
            panel.style.zIndex = '9999';
            panel.style.padding = '0';
            panel.style.borderRadius = '18px 0 0 18px';
            panel.style.minHeight = '80px';
            panel.style.fontSize = '15px';
            panel.style.overflowY = 'auto';
            panel.style.maxHeight = '85vh';
            panel.style.display = 'flex';
            panel.style.flexDirection = 'column';
            panel.style.transition = 'box-shadow 0.2s';
            document.body.appendChild(panel);
        }
        // Contenu
        const convId = getConvId();
        const pinned = (getPinned()[convId] || []);
        panel.style.backgroundColor = 'var(--token-sidebar-background, #333)';
        let html = `<div style="display:flex;align-items:center;justify-content:space-between;padding:18px 18px 10px 18px;border-bottom:1px solid #eee;background:var(--token-main-surface-secondary,#f7f7f8);border-radius:18px 0 0 0;">
            <span style="font-weight:600;font-size:17px;display:flex;align-items:center;gap:8px;">${SVG_FLOAT_PIN} Réponses épinglées</span>
            <button id="close-multi-pin-panel" style="background:none;border:none;font-size:22px;cursor:pointer;color:#888;line-height:1;">✖️</button>
        </div>`;
        html += `<div style="padding:18px 18px 18px 28px;overflow-y:auto;flex:1;">`;
        if (!pinned.length) {
            html += '<div style="color:#888;">Aucune réponse épinglée pour cette conversation.</div>';
        } else {
            html += '<ol style="padding-left:0;list-style:decimal inside;">';
            pinned.forEach((p, i) => {
                html += `<li style="margin-bottom:16px;position:relative;background:var(--token-sidebar-surface-secondary,#f5f5f5);border-radius:10px;padding:10px 12px 10px 18px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                    <button class="${UNPIN_BTN_CLASS}" data-idx="${i}" title="Retirer l'épingle" style="position:absolute;left:-8px;top:8px;background:none;border:none;cursor:pointer;font-size:15px;color:#c00;">❌</button>
                    <span style="white-space:pre-line;">${p.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>
                </li>`;
            });
            html += '</ol>';
        }
        html += '</div>';
        panel.innerHTML = html;
        // Gestion fermeture panneau
        panel.querySelector('#close-multi-pin-panel').onclick = () => panel.remove();
        // Gestion désépinglage
        panel.querySelectorAll('.' + UNPIN_BTN_CLASS).forEach(btn => {
            btn.onclick = (e) => {
                const idx = parseInt(btn.getAttribute('data-idx'));
                const pinnedAll = getPinned();
                const arr = pinnedAll[convId] || [];
                arr.splice(idx, 1);
                pinnedAll[convId] = arr;
                setPinned(pinnedAll);
                showPanel();
            };
        });
    }

    // Ajoute un bouton flottant pour ouvrir le panneau (style pinARCHIVE)
    function addFloatingPanelBtn() {
        if (document.getElementById('open-multi-pin-panel')) return;
        const btn = document.createElement('button');
        btn.id = 'open-multi-pin-panel';
        btn.title = 'Voir les réponses épinglées';
        btn.style.position = 'fixed';
        btn.style.bottom = '30px';
        btn.style.right = '28px';
        btn.style.zIndex = '9999';
        btn.style.background = 'var(--token-main-surface-primary, #fff)';
        btn.style.border = '2px solid #999';
        btn.style.borderRadius = '50%';
        btn.style.width = '48px';
        btn.style.height = '48px';
        btn.style.fontSize = '22px';
        btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = 'var(--token-main-surface-secondary, #444)';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.transition = 'box-shadow 0.2s';
        btn.innerHTML = SVG_FLOAT_PIN;
        btn.onmouseenter = () => { btn.style.boxShadow = '0 6px 24px rgba(0,0,0,0.18)'; };
        btn.onmouseleave = () => { btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)'; };
        btn.onclick = showPanel;
        document.body.appendChild(btn);
    }

    // Rafraîchit tout, throttle 800ms
    let lastRefresh = 0;
    function refresh() {
        const now = Date.now();
        if (now - lastRefresh < 800) return;
        lastRefresh = now;
        addPinButtons();
        addFloatingPanelBtn();
    }

    // Observe uniquement la zone des messages
    function getMessagesContainer() {
        // On cible le conteneur principal des messages (nav + main > div > div)
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
    // Premier appel
    refresh();
    observeMessages();

    // Ajoute un listener pour changer l’icône si le mode sombre change dynamiquement
    function watchDarkMode() {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('.multi-pin-btn').forEach(btn => {
                btn.innerHTML = SVG_PIN;
            });
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
    watchDarkMode();

})(); 