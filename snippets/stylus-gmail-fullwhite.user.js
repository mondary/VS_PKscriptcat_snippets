// ==UserScript==
// @name         Stylus - Gmail FullWhite
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=40, sha1=03235c00)
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

  let css = "/* 1) Tout en blanc, police fine */\nbody,\n.aeF,\n.nH,\n.nH .aeF,\n.nH .nH.Hd,\ndiv.brC-aT5-aOt-Jw {\n  background: #fff !important;\n  color: #222 !important;\n  font-family: sans-serif !important;\n  font-size: 13px !important;\n  line-height: 1.3 !important;\n}";
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
