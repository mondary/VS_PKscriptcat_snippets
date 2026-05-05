// ==UserScript==
// @name         PK-GMAIL No Spam Icon
// @namespace    https://github.com/mondary
// @author       cMondary
// @version      0.1
// @description  Ajoute une icÃ´ne de validation lorsqu'il n'y a pas de spam
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .TC:has(div:contains("OK, aucun spam"))::before {
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 8px;
            vertical-align: middle;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2334A853'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .TC div:contains("OK, aucun spam") {
            display: flex;
            align-items: center;
            color: #34A853;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

})();