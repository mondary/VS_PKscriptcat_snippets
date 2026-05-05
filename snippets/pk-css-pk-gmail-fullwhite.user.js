// ==UserScript==
// @name         PK CSS - PK_Gmail-FullWhite
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for PK_Gmail-FullWhite.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "/* 1) Tout en blanc, police fine */\nbody,\n.aeF,\n.nH,\n.nH .aeF,\n.nH .nH.Hd,\ndiv.brC-aT5-aOt-Jw {\n  background: #fff !important;\n  color: #222 !important;\n  font-family: sans-serif !important;\n  font-size: 13px !important;\n  line-height: 1.3 !important;\n}\n";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
