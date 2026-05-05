// ==UserScript==
// @name         ChatGPT Sidebar Pin FR (style pinCHAT)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Épingler des discussions dans la barre latérale de ChatGPT, style et UX fidèles à pinCHAT, sans limite, tout en français
// @author       cmondary
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // SVGs inspirés de pinCHAT
    const SVG_PIN = `<svg width="20" height="20" viewBox="125 125 774 774" style="vertical-align: middle;fill: currentColor;overflow: hidden;" xmlns="http://www.w3.org/2000/svg"><path d="M631.637333 178.432a64 64 0 0 1 19.84 13.504l167.616 167.786667a64 64 0 0 1-19.370666 103.744l-59.392 26.304-111.424 111.552-8.832 122.709333a64 64 0 0 1-109.098667 40.64l-108.202667-108.309333-184.384 185.237333-45.354666-45.162667 184.490666-185.344-111.936-112.021333a64 64 0 0 1 40.512-109.056l126.208-9.429333 109.44-109.568 25.706667-59.306667a64 64 0 0 1 84.181333-33.28z m-25.450666 58.730667l-30.549334 70.464-134.826666 135.04-149.973334 11.157333 265.408 265.6 10.538667-146.474667 136.704-136.874666 70.336-31.146667-167.637333-167.765333z"/></svg>`;
    const SVG_UNPIN = `<svg width="20" height="20" viewBox="125 125 774 774" style="vertical-align: middle;fill: currentColor;overflow: hidden;" xmlns="http://www.w3.org/2000/svg"><path d="M631.637333 178.432a64 64 0 0 1 19.84 13.504l167.616 167.786667a64 64 0 0 1-19.370666 103.744l-59.392 26.304-111.424 111.552-8.832 122.709333a64 64 0 0 1-109.098667 40.64l-108.202667-108.309333-184.384 185.237333-45.354666-45.162667 184.490666-185.344-111.936-112.021333a64 64 0 0 1 40.512-109.056l126.208-9.429333 109.44-109.568 25.706667-59.306667a64 64 0 0 1 84.181333-33.28z m-25.450666 58.730667l-30.549334 70.464-134.826666 135.04-149.973334 11.157333 265.408 265.6 10.538667-146.474667 136.704-136.874666 70.336-31.146667-167.637333-167.765333z"/><path style="fill: currentColor; stroke: currentColor; stroke-width: 40px;" d="M 314.43 222.675 L 774.686 700.69 L 314.43 222.675 Z"/></svg>`;
    const LS_KEY = 'chatgpt-pinned-chats';
    const PINNED_SECTION_ID = 'pinned-chats-section';
    const PIN_BTN_CLASS = 'pin-chat-btn';
    const UNPIN_BTN_CLASS = 'unpin-chat-btn';
    const HEADER_LABEL = '📌 Épinglés';

    // Ajout du style inspiré de pinCHAT
    function injectStyle() {
        if (document.getElementById('pinchat-style')) return;
        const style = document.createElement('style');
        style.id = 'pinchat-style';
        style.textContent = `
        #${PINNED_SECTION_ID} {
            background: var(--background-primary, #fff);
            border-radius: 10px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            padding: 8px 0 4px 0;
        }
        #${PINNED_SECTION_ID} h3 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 6px 0;
            padding: 0 18px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #333;
        }
        #${PINNED_SECTION_ID} ul {
            list-style: none;
            margin: 0;
            padding: 0 0 0 0;
        }
        #${PINNED_SECTION_ID} li {
            display: flex;
            align-items: center;
            padding: 4px 18px;
            border-radius: 6px;
            transition: background 0.15s;
        }
        #${PINNED_SECTION_ID} li:hover {
            background: #f3f3f3;
        }
        #${PINNED_SECTION_ID} a {
            flex: 1;
            text-decoration: none;
            color: inherit;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.98em;
        }
        .${UNPIN_BTN_CLASS} {
            background: none;
            border: none;
            margin-left: 0.5em;
            cursor: pointer;
            color: #c00;
            padding: 2px;
            border-radius: 50%;
            transition: background 0.15s;
        }
        .${UNPIN_BTN_CLASS}:hover {
            background: #ffeaea;
        }
        .${PIN_BTN_CLASS} {
            background: none;
            border: none;
            margin-left: 0.5em;
            cursor: pointer;
            color: #888;
            padding: 2px;
            border-radius: 50%;
            transition: background 0.15s;
        }
        .${PIN_BTN_CLASS}:hover {
            background: #e6f0ff;
            color: #0070f3;
        }
        #${PINNED_SECTION_ID} .empty {
            color: #aaa;
            font-size: 0.97em;
            padding: 4px 18px;
        }
        `;
        document.head.appendChild(style);
    }

    // Récupère les discussions épinglées depuis le localStorage
    function getPinnedChats() {
        try {
            return JSON.parse(localStorage.getItem(LS_KEY)) || [];
        } catch {
            return [];
        }
    }

    // Sauvegarde les discussions épinglées dans le localStorage
    function setPinnedChats(chats) {
        localStorage.setItem(LS_KEY, JSON.stringify(chats));
    }

    // Ajoute ou retire un chat de la liste épinglée
    function togglePin(chatId, chatTitle) {
        let pinned = getPinnedChats();
        if (pinned.some(c => c.id === chatId)) {
            pinned = pinned.filter(c => c.id !== chatId);
        } else {
            pinned.push({id: chatId, title: chatTitle});
        }
        setPinnedChats(pinned);
        renderPinnedSection();
        updateAllPinButtons();
    }

    // Génère la section des discussions épinglées
    function renderPinnedSection() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        let section = document.getElementById(PINNED_SECTION_ID);
        if (!section) {
            section = document.createElement('div');
            section.id = PINNED_SECTION_ID;
            nav.insertBefore(section, nav.firstChild);
        }
        const pinned = getPinnedChats();
        section.innerHTML = `<h3>${HEADER_LABEL}</h3>`;
        if (pinned.length === 0) {
            section.innerHTML += `<div class="empty">Aucune discussion épinglée</div>`;
        } else {
            section.innerHTML += '<ul>' +
                pinned.map(chat => `<li><a href="/c/${chat.id}">${chat.title}</a><button class="${UNPIN_BTN_CLASS}" data-id="${chat.id}" title="Détacher">${SVG_UNPIN}</button></li>`).join('') + '</ul>';
        }
        // Ajoute les listeners pour détacher
        section.querySelectorAll('.' + UNPIN_BTN_CLASS).forEach(btn => {
            btn.onclick = (e) => {
                const id = btn.getAttribute('data-id');
                togglePin(id, '');
            };
        });
    }

    // Ajoute les boutons d'épinglage sur chaque chat de la barre latérale
    function updateAllPinButtons() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        const chatLinks = nav.querySelectorAll('a[href^="/c/"]');
        const pinned = getPinnedChats();
        chatLinks.forEach(link => {
            // Évite de dupliquer le bouton
            if (link.parentElement.querySelector('.' + PIN_BTN_CLASS)) return;
            const match = link.getAttribute('href').match(/\/c\/([0-9a-f\-]{36})/);
            if (!match) return;
            const chatId = match[1];
            const chatTitle = link.textContent.trim() || 'Sans titre';
            const isPinned = pinned.some(c => c.id === chatId);
            const btn = document.createElement('button');
            btn.className = PIN_BTN_CLASS;
            btn.innerHTML = isPinned ? SVG_UNPIN : SVG_PIN;
            btn.title = isPinned ? 'Détacher' : 'Épingler';
            btn.onclick = (e) => {
                e.preventDefault();
                togglePin(chatId, chatTitle);
            };
            // Ajoute le bouton après le lien
            link.parentElement.appendChild(btn);
        });
    }

    // Ajoute le bouton d'épingle en haut à droite du chat (à côté du bouton profil), logique inspirée de pinCHAT, version optimisée
    function addPinUnpinCurrentChatButton() {
        const chatMatch = window.location.pathname.match(/\/c\/([0-9a-f\-]{36})$/);
        if (!chatMatch) return;
        const chatId = chatMatch[1];
        const profileBtn = document.querySelector('button[data-testid="profile-button"]');
        if (!profileBtn) return;
        // Vérifie si le bouton existe déjà et est correct
        const existing = document.getElementById('pinchat-pin-current-btn');
        const pinned = getPinnedChats();
        const isPinned = pinned.some(c => c.id === chatId);
        if (existing) {
            // Si le bouton est déjà correct, ne rien faire
            if ((isPinned && existing.innerHTML === SVG_UNPIN) || (!isPinned && existing.innerHTML === SVG_PIN)) return;
            existing.remove();
        }
        // Crée le bouton
        const btn = document.createElement('button');
        btn.id = 'pinchat-pin-current-btn';
        btn.innerHTML = isPinned ? SVG_UNPIN : SVG_PIN;
        btn.title = isPinned ? 'Détacher cette discussion' : 'Épingler cette discussion';
        btn.className = 'pinchat-header-btn';
        btn.style.height = '40px';
        btn.style.width = '40px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.marginRight = '4px';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background 0.15s';
        btn.onmouseenter = () => btn.style.background = '#f3f3f3';
        btn.onmouseleave = () => btn.style.background = 'none';
        btn.onclick = (e) => {
            e.preventDefault();
            let chatTitle = '';
            const nav = document.querySelector('nav');
            if (nav) {
                const activeLink = nav.querySelector(`a[href="/c/${chatId}"]`);
                if (activeLink) {
                    chatTitle = activeLink.textContent.trim();
                }
            }
            if (!chatTitle) {
                chatTitle = document.title;
                if (chatTitle.includes(' - ')) chatTitle = chatTitle.split(' - ').slice(1).join(' - ');
                if (!chatTitle) chatTitle = 'Sans titre';
            }
            let pinned = getPinnedChats();
            if (isPinned) {
                pinned = pinned.filter(c => c.id !== chatId);
            } else {
                pinned.push({id: chatId, title: chatTitle});
            }
            setPinnedChats(pinned);
            // Rafraîchit tout
            addPinUnpinCurrentChatButton();
            renderPinnedSection();
            updateAllPinButtons();
        };
        profileBtn.parentElement.insertBefore(btn, profileBtn);
    }
    // Style pour le bouton header (fidèle à pinCHAT)
    function injectHeaderBtnStyle() {
        if (document.getElementById('pinchat-header-btn-style')) return;
        const style = document.createElement('style');
        style.id = 'pinchat-header-btn-style';
        style.textContent = `.pinchat-header-btn svg { width: 22px; height: 22px; }`;
        document.head.appendChild(style);
    }

    // MutationObserver pour le header du chat (ajout/maj du bouton d'épingle)
    function observeHeaderPinButton() {
        let lastChatId = null;
        let headerObserver = null;
        function checkAndObserve() {
            const chatMatch = window.location.pathname.match(/\/c\/([0-9a-f\-]{36})$/);
            const chatId = chatMatch ? chatMatch[1] : null;
            if (chatId !== lastChatId) {
                lastChatId = chatId;
                setTimeout(addPinUnpinCurrentChatButton, 200);
            }
            // Observe le header du chat pour réagir aux changements de boutons
            const profileBtn = document.querySelector('button[data-testid="profile-button"]');
            if (profileBtn && !headerObserver) {
                headerObserver = new MutationObserver(() => {
                    addPinUnpinCurrentChatButton();
                });
                headerObserver.observe(profileBtn.parentElement, {childList: true, subtree: false});
            }
        }
        // Observe les changements d'URL (SPA)
        let lastUrl = location.href;
        const urlObserver = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                checkAndObserve();
            }
        });
        urlObserver.observe(document.body, {childList: true, subtree: true});
        // Premier check
        checkAndObserve();
    }

    // MutationObserver pour la sidebar (ajout/maj de la section épinglée et des boutons)
    function observeSidebar() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        let lastSidebarHtml = '';
        const observer = new MutationObserver(() => {
            // Ne met à jour que si le DOM a vraiment changé
            const currentHtml = nav.innerHTML;
            if (currentHtml !== lastSidebarHtml) {
                lastSidebarHtml = currentHtml;
                updateAllPinButtons();
                renderPinnedSection();
            }
        });
        observer.observe(nav, {childList: true, subtree: true});
    }

    // Ajoute la gestion du collaps/expand sur la section Épinglé
    const COLLAPSE_KEY = 'chatgpt-pinned-collapsed';

    function isPinnedCollapsed() {
        return localStorage.getItem(COLLAPSE_KEY) === 'true';
    }
    function setPinnedCollapsed(val) {
        localStorage.setItem(COLLAPSE_KEY, val ? 'true' : 'false');
    }

    function addCollapseExpandToPinnedSection() {
        const pinnedSection = document.getElementById(PINNED_SECTION_ID);
        if (!pinnedSection) return;
        // Sélectionne le header (h2, h3, ou autre)
        let header = pinnedSection.querySelector('h2, h3, .pinned-collapsible-header');
        if (!header) return;
        // Met à jour le texte du header en « 📌 Épinglés » et structure pour aligner le chevron à droite
        header.innerHTML = '<span class="pinned-title-text">📌 Épinglés</span><span class="pinned-chevron" style="float:right;margin-left:8px;font-size:1.1em;user-select:none;">' + (collapsed ? '▼' : '▲') + '</span>';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.cursor = 'pointer';
        header.title = 'Afficher/masquer les discussions épinglées';
        header.classList.add('pinned-collapsible-header');
        // Conteneur de la liste
        let list = pinnedSection.querySelector('.pinned-list');
        if (!list) {
            list = document.createElement('div');
            list.className = 'pinned-list';
            while (pinnedSection.children.length > 1) {
                list.appendChild(pinnedSection.children[1]);
            }
            pinnedSection.appendChild(list);
        }
        // Applique l’état initial
        list.style.maxHeight = collapsed ? '0' : '1000px';
        list.style.overflow = 'hidden';
        list.style.transition = 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)';
        // Nettoie les anciens gestionnaires
        header.onclick = null;
        // Gestion du clic
        header.onclick = () => {
            const isNowCollapsed = !isPinnedCollapsed();
            setPinnedCollapsed(isNowCollapsed);
            list.style.maxHeight = isNowCollapsed ? '0' : '1000px';
            // Met à jour le chevron
            const chev = header.querySelector('.pinned-chevron');
            if (chev) chev.textContent = isNowCollapsed ? '▼' : '▲';
        };
    }

    // Initialisation
    function init() {
        injectStyle();
        injectHeaderBtnStyle();
        setTimeout(() => {
            renderPinnedSection();
            updateAllPinButtons();
            observeSidebar();
            observeHeaderPinButton();
            addCollapseExpandToPinnedSection(); // Call this after renderPinnedSection
        }, 1200);
    }

    // Lance le script
    init();

})(); 