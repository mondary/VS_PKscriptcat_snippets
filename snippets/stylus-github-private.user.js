// ==UserScript==
// @name         Stylus - GITHUB - private
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=47, sha1=9fc51a63)
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
    matchAny(["https://github.com/mondary?tab=repositories"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* ==============================\n *  Mise en évidence des repos PRIVATE (VERSION FONCTIONNELLE)\n * ============================== */\n\n#user-repositories-list span.Label {\n  position: relative;\n}\n\n/* Cible UNIQUEMENT le vrai badge Private */\n#user-repositories-list span.Label[data-view-component=\"true\"] {\n  /* reset visuel neutre par défaut */\n  background: transparent;\n}\n\n/* Le vrai hack fiable : GitHub met aria-label=\"Private\" */\n#user-repositories-list span[aria-label=\"Private\"] {\n  background: linear-gradient(135deg, #ff4d4d, #b31212) !important;\n  color: #ffffff !important;\n  border: 1px solid rgba(0, 0, 0, 0.15) !important;\n\n  font-weight: 700 !important;\n  letter-spacing: 0.3px;\n\n  padding: 2px 10px !important;\n  border-radius: 999px !important;\n\n  box-shadow: \n    0 2px 6px rgba(179, 18, 18, 0.35),\n    inset 0 0 0 1px rgba(255,255,255,0.25);\n}\n\n/* Icône cadenas */\n#user-repositories-list span[aria-label=\"Private\"]::before {\n  content: \"🔒 \";\n}";
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
