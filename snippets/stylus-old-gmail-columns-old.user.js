// ==UserScript==
// @name         Stylus - OLD Gmail columns OLD
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=17, sha1=81295c2d)
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

  let css = "/* Main container */\n        .aeF {\n            max-width: 1600px !important;\n            margin: 0 auto !important;\n            padding: 0 8px !important;\n        }\n\n        /* Toolbar - full width */\n        .Tm {\n            width: 100% !important;\n            display: block !important;\n        }\n\n        /* Email list container */\n        .aeF .Cp {\n            width: 100% !important;\n        }\n\n        /* Email list table */\n        .aeF .Cp table {\n            table-layout: fixed !important;\n            width: 100% !important;\n        }\n\n        /* Table body */\n        .aeF .Cp table > tbody {\n            column-count: 2 !important;\n            column-gap: 100px !important;\n            display: block !important;\n        }\n\n        /* Email rows */\n        .aeF .Cp table > tbody > tr {\n            break-inside: avoid !important;\n            page-break-inside: avoid !important;\n            background: transparent !important;\n            border-bottom: 1px solid rgba(0,0,0,0.05) !important;\n        }\n\n        /* Email row hover effect */\n        .aeF .Cp table > tbody > tr:hover {\n            background: rgba(0,0,0,0.02) !important;\n        }\n\n        /* Email content cells */\n        .aeF .Cp table > tbody > tr > td {\n            padding: 2px 4px !important;\n            line-height: 1.2 !important;\n        }\n\n        /* Checkbox column */\n        .aeF .Cp table > tbody > tr > td.oZ-x3 {\n            position: relative !important;\n            padding: 2px !important;\n        }\n\n        /* Email content spacing */\n        .aeF .Cp table > tbody > tr > td.a4W {\n            padding: 2px !important;\n        }\n\n        /* Improve text readability */\n        .aeF .Cp table .y6 {\n            font-size: 12px !important;\n            line-height: 1.2 !important;\n        }\n\n        /* Adjust email preview text */\n        .aeF .Cp table .y6 .bog {\n            color: #666 !important;\n        }";
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
