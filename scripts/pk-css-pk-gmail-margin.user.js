// ==UserScript==
// @name         PK CSS - PK_Gmail-Margin
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-Margin.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = ".aBA + .bkK,\n.a3W + .bkK {\n\tmargin-left: 80px;\n\tmargin-right: 30px;\n\tmargin-top: 0px;\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
