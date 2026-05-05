// ==UserScript==
// @name         PK Gmail New Message Button
// @namespace    https://github.com/mondary
// @version      1.0
// @description  Add a New Message button next to Gmail logo
// @author       cMondary
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const BUTTON_STYLES = `
        .new-message-button {
            background-color: #c2e7ff !important;
            color: #001d35 !important;
            padding: 8px 16px !important;
            border-radius: 16px !important;
            font-family: "Google Sans", Roboto, Arial, sans-serif !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: background-color 0.2s !important;
            white-space: nowrap !important;
            display: flex !important;
            align-items: center !important;
            text-decoration: none !important;
            border: none !important;
            outline: none !important;
            margin-left: 16px !important;
        }

        .new-message-button:hover {
            background-color: #95d1ff !important;
        }
    `;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = BUTTON_STYLES;
    document.head.appendChild(styleSheet);

    // Create and insert the button
    function createNewMessageButton() {
        const logoContainer = document.querySelector('.gb_ud.gb_sd.gb_xd');
        if (!logoContainer || logoContainer.querySelector('.new-message-button')) return;

        const button = document.createElement('button');
        button.className = 'new-message-button';
        button.textContent = 'New Message';
        button.onclick = () => {
            // Open compose window using direct URL
            window.location.href = 'https://mail.google.com/mail/u/0/#inbox?compose=new';
        };

        logoContainer.style.display = 'flex';
        logoContainer.style.alignItems = 'center';
        logoContainer.appendChild(button);
    }

    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
        createNewMessageButton();
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial creation attempt
    createNewMessageButton();
})();