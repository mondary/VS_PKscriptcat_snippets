// ==UserScript==
// @name         Stylus - caisse-epargne.fr
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=19, sha1=d136f201)
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
    matchAny(["caisse-epargne.fr"], domainMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".neo-tile-size-m.neo-tile-padding-xy.neo-tile-border-none.neo-tile.has-card {\n  background-color: #00c51440;\n}\n\n/* Ce code CSS doit être injecté dans la page, par exemple via un userscript */\n#neo-tile-3, #neo-tile-4, #neo-tile-6 {\n  background-color: #f3ddfe !important;\n}";
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
