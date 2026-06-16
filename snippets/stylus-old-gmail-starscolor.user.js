// ==UserScript==
// @name         Stylus - OLD Gmail StarsColor
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=2, sha1=7acf5546)
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
    matchAny(["mail.google.com"], domainMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* MAIL STARRED/FOLLOWED */\n/* BACKGROUND */\n.yO.zA {\n    background: #ffd7000d !important;\n}\n\n.yO.zA .xS span .bqe {\n    font-family: arial !important;\n    font-weight: 600 !important;\n}\n\n/* ==== END ==== */";
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
