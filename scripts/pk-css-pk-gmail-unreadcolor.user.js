// ==UserScript==
// @name         PK CSS - PK_Gmail-UnreadColor
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-UnreadColor.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "\n/* MAIL NOT READ */\n/* BACKROUND */\n.zA:not(.yO) {\n    background: #6464640d !important;\n}\n\n.zA:not(.yO) .xS span  .bqe {\n    font-family: arial !important;\n    font-weight: 600 !important;\n}\n\n/* ==== END ==== */\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
