// ==UserScript==
// @name         Stylus - Linkedin PK
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=33, sha1=d94de935)
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
    matchAny(["https://www.linkedin.com/in/clementmondary/recent-activity/all/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".scaffold-layout__main {\n        grid-area: main;\n        width: 160%;\n\tmax-width: 850px;\n    }\n\t\n\t.ember-view.artdeco-card.mb4.mn-invitations-preview,\n\t.mb4.pr2.pl4.pv4.align-items-center.display-flex.ember-view.artdeco-card,\n\t.overflow-hidden.mb4.artdeco-card {\n        width: 200%;\n\tmax-width: 850px;\n    }\n    \n    .scaffold-layout-container--reflow.scaffold-layout-container.scaffold-layout__inner {\n        grid-area: main;\n        width: 65%;\n    }\n\n   \t.scaffold-layout__aside, li.global-nav__primary-item:nth-of-type(8) > .global-nav__primary-link.app-aware-link {\n        display: none;\n    }";
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
