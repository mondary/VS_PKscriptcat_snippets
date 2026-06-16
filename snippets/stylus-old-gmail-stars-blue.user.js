// ==UserScript==
// @name         Stylus - OLD Gmail Stars blue
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=3, sha1=1302bc33)
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
    matchAny(["https://mail\\.google\\.com/.*"], reMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* Ligne contenant une étoile activée */\n  .zA:has(.T-KT:not(.aXw)) {\n    background-color: #f0f8ff !important; /* Bleu pâle très clair */\n    border-left: 4px solid #00bcd4 !important; /* Bordure colorée à gauche */\n    transition: background-color 0.3s ease, transform 0.3s ease;\n  }\n\n  /* Effet de survol pour l'interaction */\n  .zA:hover:has(.T-KT:not(.aXw)) {\n    transform: scale(1.02); /* Légère mise en valeur au survol */\n    background-color: #e0f7fa !important; /* Changement de couleur au survol */\n  }\n\n  /* Transition fluide de la ligne entière */\n  .zA {\n    transition: background-color 0.3s ease, transform 0.3s ease;\n  }";
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
