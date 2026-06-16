// ==UserScript==
// @name         Stylus - Gmail Stars
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=1, sha1=afdf999c)
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
    matchAny(["https://mail\\.google\\.com/.*"], reMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* Ligne contenant une étoile activée */\n  .zA:has(.T-KT:not(.aXw)) {\n    background-color: #fefcf4 !important; /* jaune doux crème */\n    border-left: 4px solid #ffc107 !important; /* bande couleur ambre */\n    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);\n  }\n\n  .zA {\n    transition: background-color 0.3s ease, box-shadow 0.3s ease;\n  }";
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
