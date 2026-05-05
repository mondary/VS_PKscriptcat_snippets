// ==UserScript==
// @name         PK CSS - PK_Gmail-StarsFocus
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-StarsFocus.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "/* Ligne contenant une Ã©toile activÃ©e */\n.zA:has(.T-KT:not(.aXw)) {\n  background-color: #fefcf4 !important; /* jaune doux crÃ¨me */\n  border-left: 4px solid #ffc107 !important; /* bande couleur ambre */\n  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);\n}\n\n.zA {\n  transition: background-color 0.3s ease, box-shadow 0.3s ease;\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
