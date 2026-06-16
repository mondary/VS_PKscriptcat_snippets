// ==UserScript==
// @name         Stylus - OLD Gmail Topic Sticky OLD
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=21, sha1=8cd91040)
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-idle
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

  let css = "/* Rendre le premier div avec la classe .nH sticky sans cacher les menus */\n.iY.a98.nH > div.nH:nth-of-type(1) {\n    position: sticky !important; /* Comportement sticky forcé */\n    top: 0 !important;           /* Collé en haut du conteneur parent */\n    z-index: 1 !important;      /* Z-index inférieur pour ne pas passer au-dessus des menus */\n    background-color: white;     /* Optionnel pour éviter la transparence */\n}\n\n/* Assurer que les menus passent toujours au-dessus */\n.aX2.jQjAxd.aYO.agd.J-M,\n.aX1.jQjAxd.aYO.agd.J-M {\n    z-index: 100 !important; /* Un z-index supérieur pour les menus */\n}\n\n/* Assurer que ##.aaZ passe toujours au-dessus */\n.aaZ {\n    z-index: 101 !important; /* Un z-index légèrement supérieur */\n}";
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
