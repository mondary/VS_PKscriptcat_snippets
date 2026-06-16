// ==UserScript==
// @name         Stylus - PK gg.deals
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=31, sha1=b95cea10)
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
    matchAny(["https://gg.deals/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/*\n    TAG ICONS COLOR\n    */\n    .svg-icon-wishlist-fill {\n        color: #ff47f0;\n    }\n    .svg-icon-owned-fill {\n        color: #279af1;\n    }\n    .svg-icon-platform-geforce-now.svg-icon {\n        color: #00ff02;\n    }\n\n    /*\n    DRM ICONS COLOR\n    */\n    .svg-icon-drm-prime-gaming {\n        color: #ff0;\n    }\n    .svg-icon-drm-steam {\n        color: #279af1;\n    }\n    .svg-icon-drm-epic-games {\n        color: #be2130;\n    }\n    .svg-icon-drm-gog {\n        color: #ba5ffb;\n    }\n\n    /*\n    DRM STORE ICONS COLOR\n    */\n    .tippy-initialized.svg-icon-drm-steam {\n        color: #279af1;\n    }\n\n    /*\n    V2 BACKGROUND\n    */\n.owned {\n    background-color: #008fffbf;\n    transition: background-color 0.3s ease; /* Transition de 0.3 secondes */\n}\n\n.owned:hover {\n    background-color: #0090ff !important;\n}\n\n\n\n\n    .owned.wishlisted {\n        background: linear-gradient(0.5turn, #279af1, #ff48f1d6);\n    }\n    .owned.wishlisted:hover {\n        background: linear-gradient(0.5turn, #1190f1, #f323e3d6) !important;\n    }\n\n\n\n\n.wishlisted {\n    background-color: #fa00e65c;\n    transition: background-color 0.3s ease; /* Transition de 0.3 secondes */\n}\n.wishlisted:hover {\n    background-color: #fa00e699 !important;\n}\n\n\n    .owned.with-checkbox  {\n        background-color: #008fff5c;\n    }\n    .owned.with-checkbox:hover  {\n        background-color: #008fff85;\n    }\n    .wishlisted.with-checkbox {\n        background-color: #fa00e65c;\n    }    \n    .wishlisted.with-checkbox:hover {\n        background-color: #fa00e699;\n    }\n\n.owned.with-badges:hover {\n    background-color: #0290ff !important;\n}\n.wishlisted.with-badges:hover {\n    background-color: #fa00e699 !important;\n}\n\n\n.wishlisted.initialised-trimGameBoxesTitles.portrait-layout.flex-nowrap.hoverable-box {\n        background-color: #fa00e65c;\n    }\n\n\n\n\n.banner-side-link {\n        display: none !important;\n    }\n.pinned.side-link-left {\n        display: none !important;\n    }\n.side-link-left {\n        display: none !important;\n    }\n\n.banner-full-link {\n        display: none !important;\n    }\n.flex-justify-center.d-flex  {\n        display: none !important;\n    }\n\n/* Masquer l'image spécifique */\nimg[src*=\"bc33f0593dc5f90b3f81aaddeea96cef65ae\"]\n  display none\n  position relative\n\n/* Ajouter une couleur de fond verte à son parent */\nimg[src*=\"bc33f0593dc5f90b3f81aaddeea96cef65ae\"]::before\n  content ''\n  display block\n  width 100%\n  height 100%\n  background-color green\n  position absolute\n  top 0\n  left 0\n  z-index -1\n\n\n/* Cibler et masquer l'image par son URL */\nimg[src=\"https://img.gg.deals/26/d4/bc33f0593dc5f90b3f81aaddeea96cef65ae_2560xt1440_Q100.jpg\"]\n  display none\n\n\n\n\n.banner-image-container.flex-justify-center.d-flex {\n        display: none !important;\n    }\n\n  \n    .with-image.site-banner-content-widget {\n        display: none;\n    }";
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
