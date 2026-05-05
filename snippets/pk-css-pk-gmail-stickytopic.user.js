// ==UserScript==
// @name         PK CSS - PK_Gmail-StickyTopic
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-StickyTopic.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "/* Rendre le premier div avec la classe .nH sticky sans cacher les menus */\n.iY.a98.nH > div.nH:nth-of-type(1) {\n    position: sticky !important; /* Comportement sticky forcÃ© */\n    top: 0 !important;           /* CollÃ© en haut du conteneur parent */\n    z-index: 1 !important;      /* PrioritÃ© infÃ©rieure Ã  .aVN */\n    background-color: white;     /* Ãvite la transparence */\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
