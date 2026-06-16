// ==UserScript==
// @name         Stylus - PK4
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=28, sha1=e5d9dd76)
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
    matchAny(["https://www.youtube.com"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* Style pour rendre le conteneur du lecteur YouTube sticky */\n#player-container-outer {\n    position: fixed !important;\n    top: 80px !important; /* Ajuste la distance par rapport au haut de la page */\n    left: 25px !important; /* Ajuste la distance par rapport au côté droit de la page */\n\n    z-index: 1000 !important; /* S'assure que le lecteur est au-dessus des autres éléments */\n}";
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
