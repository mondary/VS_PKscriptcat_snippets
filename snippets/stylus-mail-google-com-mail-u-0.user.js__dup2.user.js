// ==UserScript==
// @name         Stylus - mail.google.com/mail/u/0/
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=23, sha1=cb7303c3)
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
    matchAny(["https://mail.google.com/*"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".brC-bsf-aT5-aOt {\n  opacity: 0.7 !important; /* Ajuste la transparence */\n  transition: opacity 0.3s !important; /* Ajoute une transition */\n}\n\n.brC-bsf-aT5-aOt:hover {\n  opacity: 1 !important; /* Pleine opacité au survol */\n}\n\n\n\n.aT5-aOt-I-JX-Jw {\n  opacity: 0.7 !important; /* Ajuste la transparence */\n  transition: opacity 0.3s !important; /* Ajoute une transition */\n}\n\n.brC-bsf-aT5-aOtv {\n  opacity: 0.7 !important; /* Ajuste la transparence */\n  transition: opacity 0.3s !important; /* Ajoute une transition */\n}\n\ndiv.brC-bsf-aT5-aOt {\n  opacity: 0.7 !important;\n  transition: opacity 0.3s !important;\n}\n\ndiv.brC-bsf-aT5-aOt:hover {\n  opacity: 1 !important;\n}";
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
