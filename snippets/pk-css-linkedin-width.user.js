// ==UserScript==
// @name         PK CSS LinkedIn Width
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Ajuste la largeur de la page LinkedIn et cache la sidebar
// @author       cmondary
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .scaffold-layout__main {
            grid-area: main;
            width: 160%;
            max-width: 850px;
        }

        .ember-view.artdeco-card.mb4.mn-invitations-preview,
        .mb4.pr2.pl4.pv4.align-items-center.display-flex.ember-view.artdeco-card,
        .overflow-hidden.mb4.artdeco-card {
            width: 200%;
            max-width: 850px;
        }

        .scaffold-layout-container--reflow.scaffold-layout-container.scaffold-layout__inner {
            grid-area: main;
            width: 65%;
        }

        .scaffold-layout__aside, li.global-nav__primary-item:nth-of-type(8) > .global-nav__primary-link.app-aware-link {
            display: none;
        }
    `;
    document.head.appendChild(style);

})();
