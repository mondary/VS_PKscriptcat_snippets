// ==UserScript==
// @name         Stylus - Gmail Styling
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=11, sha1=dafc31aa)
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
    matchAny(["https://mail.google.com/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".zA {\n\tpadding-bottom: 16px !important;\n\tpadding-top: 16px !important;\n\tbox-shadow: none !important;\n}\n\n\n.yO {\n\tbackground: #ffffff !important;\n}\n\n\n.bkK > div:nth-child(1) {\n\tpadding-left: 40px !important;\n\tpadding-right: 40px !important;\n\tpadding-top: 20px !important;\n\tpadding-bottom: 20px !important\n}\n\n/*\n.aKh {\n\tmargin-bottom: 24px;\n}\n*/";
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
