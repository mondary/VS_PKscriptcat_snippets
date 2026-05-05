// ==UserScript==
// @name         PK CSS - PK_Gmail-TopRightButtons
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-TopRightButtons.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = ".zo , \n.gb_z.gb_gd.gb_f.gb_zf,\n.Yb.dIH7rb.bax\n{\n    display:none;\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
