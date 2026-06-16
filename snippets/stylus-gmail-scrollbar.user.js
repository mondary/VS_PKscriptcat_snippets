// ==UserScript==
// @name         Stylus - 🔴 GMAIL Scrollbar
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=30, sha1=61d05997)
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const shouldRun = () => {
  const href = location.href;
  const host = location.hostname;
  const matchAny = (arr, fn) => { for (const v of arr) { if (fn(v)) return true; } return false; };
  const domainMatches = (d) => host === d || host.endsWith('.' + d);
  const wildcardToPrefix = (u) => { const i = u.indexOf('*'); return i >= 0 ? u.slice(0, i) : u; };
  const urlRuleMatches = (u) => href.startsWith(wildcardToPrefix(u));
  const reMatches = (r) => { try { return new RegExp(r).test(href); } catch { return false; } };
  const ok = (
    matchAny(["mail.google.com/*"], domainMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* Scrollbar rouge visible */\nbody::-webkit-scrollbar,\ndiv::-webkit-scrollbar {\n    width: 12px !important; /* Largeur */\n    background-color: #f1f1f1 !important; /* Couleur de la piste */\n}\n\nbody::-webkit-scrollbar-thumb,\ndiv::-webkit-scrollbar-thumb {\n    background-color: red !important; /* Couleur rouge */\n    border-radius: 10px !important; /* Coins arrondis */\n}";
  // Approximate Stylus (user-origin) precedence: force !important.
  css = css.replace(/(!important)\s*;/gi, ';').replace(/:([^;{}]+);/g, (m, v) => `:${v.trim()} !important;`);
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

})();
