// ==UserScript==
// @name         Stylus - OLD colomn sender2
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=15, sha1=32655c83)
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

  let css = "/* Table body */\n.aeF .Cp table > tbody {\n    column-count: 2 !important;\n    column-gap: 50px !important;\n    display: block !important;\n}\n\n/* Single column layout for less than 20 emails */\n.aeF .Cp table > tbody:has(tr:nth-child(-n+19):last-child) {\n    column-count: 1 !important;\n    column-gap: 0 !important;\n}\n\n/* Email rows */\n.aeF .Cp table > tbody > tr {\n    break-inside: avoid !important;\n    page-break-inside: avoid !important;\n    background: transparent !important;\n    border-bottom: 1px solid rgba(0,0,0,0.05) !important;\n}\n\n/* Email row hover effect */\n.aeF .Cp table > tbody > tr:hover {\n    background: rgba(0,0,0,0.02) !important;\n}\n\n/* Limite la largeur du container du sender en mode 2 colonnes */\n.aeF .Cp table > tbody > tr .yW { \n    max-width: 150px !important; /* Ajuste cette valeur selon tes besoins */\n    display: inline-block !important;\n    overflow: hidden !important;\n    white-space: nowrap !important;\n    text-overflow: ellipsis !important;\n}\n\n\n/* Responsive layout */\n@media screen and (max-width: 1500px) {\n    .aeF .Cp table > tbody {\n        column-count: 1 !important;\n        column-gap: 0 !important;\n    }\n}";
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
