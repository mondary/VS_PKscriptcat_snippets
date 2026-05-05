// ==UserScript==
// @name         PK CSS - PK_Gmail-WhiteStyle
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-WhiteStyle.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = ".zA {\n\tpadding-bottom: 16px !important;\n\tpadding-top: 16px !important;\n\tbox-shadow: none !important;\n}\n\n\n.yO {\n\tbackground: #ffffff !important;\n}\n\n\n.bkK > div:nth-child(1) {\n\tpadding-left: 40px !important;\n\tpadding-right: 40px !important;\n\tpadding-top: 20px !important;\n\tpadding-bottom: 20px !important\n}\n\n/*\n.aKh {\n\tmargin-bottom: 24px;\n}\n*/\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
