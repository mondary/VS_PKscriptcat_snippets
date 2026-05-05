// ==UserScript==
// @name         PK CSS - PK_Gmail-NoLeftMenu
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-NoLeftMenu.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "\n/* Hide icons consistently across all Gmail sections */\n.aeN,\n.ain .CJ {\n    display: none !important; /* ensures icons stay hidden in all sections */\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
