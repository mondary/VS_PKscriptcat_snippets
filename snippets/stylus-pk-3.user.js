// ==UserScript==
// @name         Stylus - PK 3
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=34, sha1=edea91f6)
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
    matchAny(["https://www.youtube.com/watch?v=gkfvG2ljyEg"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "body[data-ysp=\"enable\"] #primary-inner > #player {\n    position: sticky;\n    top: 56px;\n    z-index: 2010;\n}\n\nbody[data-ysp=\"enable\"] #full-bleed-container {\n    position: sticky !important;\n    top: 0px;\n    z-index: 2021;\n}\n\nbody[data-ysp=\"enable\"] #chat-container {\n    z-index: 2030;\n}";
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
