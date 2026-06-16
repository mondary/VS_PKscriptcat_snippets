// ==UserScript==
// @name         Stylus - Gmail Sticky Topic
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=10, sha1=45e8c15d)
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
    matchAny(["https://mail.google.com/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* Rendre le premier div avec la classe .nH sticky sans cacher les menus */\n.iY.a98.nH > div.nH:nth-of-type(1) {\n    position: sticky !important; /* Comportement sticky forcé */\n    top: 0 !important;           /* Collé en haut du conteneur parent */\n    z-index: 1 !important;      /* Priorité inférieure à .aVN */\n    background-color: white;     /* Évite la transparence */\n}";
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
