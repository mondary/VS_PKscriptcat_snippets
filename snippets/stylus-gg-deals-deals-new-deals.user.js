// ==UserScript==
// @name         Stylus - gg.deals/deals/new-deals/
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=43, sha1=bc0e8825)
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
    matchAny(["gg.deals"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".keys.tippy-initialized {\n    display: grid !important;\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important; /* Adjusted minmax for better fit */\n    gap: 20px !important;\n  }\n\n  /* Optional: Adjust individual item styling if needed */\n  .deal-list-item {\n    /* Add any specific styling for individual deal cards here if they don't look right in the grid */\n    /* For example, to ensure they take full width of their grid cell */\n    width: 100% !important;\n    box-sizing: border-box !important; /* Include padding and border in the element's total width and height */\n  }";
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
