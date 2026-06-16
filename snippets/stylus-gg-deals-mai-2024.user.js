// ==UserScript==
// @name         Stylus - gg.deals - mai 2024
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=22, sha1=7a3b5a39)
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
    matchAny(["gg.deals"], domainMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".site-banner-top-widget {\ndisplay: none;\n}\n\n/*\nTAG ICONS COLOR\n*/\n.svg-icon-wishlist-fill {\n    color: #ff47f0;\n\t}\n.svg-icon-owned-fill {\n    color : #279af1;\n\t}\n.svg-icon-platform-geforce-now.svg-icon {\n  color: #00ff02;\n\t}\n\n\n\n/*\nDRM ICONS COLOR\n*/\n.svg-icon-drm-prime-gaming {\n  color: #ff0;\n\t}\n.svg-icon-drm-steam {\n  color: #279af1;\n\t}\n.svg-icon-drm-epic-games {\n  color: #be2130;\n\t}\n.svg-icon-drm-gog {\n  color: #ba5ffb;\n\t}\n\n/*\nDRM STORE ICONS COLOR\n*/\n.tippy-initialized.svg-icon-drm-steam {\n  color: #279af1;\n\t}\n\n\n/*\nV2 BACKGROUND\n*/\n.owned {\n    background-color: #008fffbf;\n}\n\n.owned:hover {\n    background-color: #007accbf; /* Une teinte plus sombre de bleu */\n}\n\n\n.wishlisted {\n    background-color: #fa00e65c;\n}\n\n.wishlisted:hover {\n    background-color: #c800b34c; /* Une teinte plus sombre de la couleur originale */\n}\n\n.owned.wishlisted {\nbackground: linear-gradient(0.5turn, #279af1, #ff48f1d6);\n}\n\n\n/*\n.owned.with-checkbox  {\n  background-color: #353448;\n}\n\n.wishlisted.with-checkbox {\n  background-color: #353448;\n}\n\n.with-image.site-banner-content-widget {\ndisplay: none;\n}";
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
