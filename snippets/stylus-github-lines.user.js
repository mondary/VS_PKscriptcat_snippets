// ==UserScript==
// @name         Stylus - Github - lines
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=48, sha1=9d371042)
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
    matchAny(["https://github.com/mondary?tab=repositories"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* Ligne complète */\n  #user-repositories-list > ul > li {\n    padding-top: 6px !important;\n    padding-bottom: 6px !important;\n    margin-bottom: 0 !important;\n  }\n\n  /* Titre */\n  #user-repositories-list h3 {\n    margin-bottom: 2px !important;\n  }\n\n  /* Description */\n  #user-repositories-list p {\n    margin-top: 0 !important;\n    margin-bottom: 4px !important;\n    line-height: 1.3 !important;\n  }\n\n  /* Ligne meta (langage, stars, date) */\n  #user-repositories-list .f6,\n  #user-repositories-list .color-fg-muted {\n    margin-top: 2px !important;\n    margin-bottom: 0 !important;\n    line-height: 1.2 !important;\n  }\n\n  /* Bloc droit (stars + graph) */\n  #user-repositories-list .text-right {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n\n  /* Boutons Star */\n  #user-repositories-list button {\n    padding-top: 2px !important;\n    padding-bottom: 2px !important;\n  }\n\n  /* Graph */\n  #user-repositories-list svg[width=\"155\"][height=\"30\"] {\n    height: 22px !important;\n  }";
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
