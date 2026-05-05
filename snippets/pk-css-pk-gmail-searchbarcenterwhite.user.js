// ==UserScript==
// @name         PK CSS - PK_Gmail-SearchBarCenterWhite
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-SearchBarCenterWhite.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "#aso_search_form_anchor {\n\tbackground-color: #fff !important;\n\tmargin: auto;\n}\n\n.w-asV {\n\tmargin-top: 16px !important;\n\tmargin-bottom: 16px !important;\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
