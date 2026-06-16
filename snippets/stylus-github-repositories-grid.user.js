// ==UserScript==
// @name         Stylus - GITHUB - repositories grid
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=46, sha1=d0e679b3)
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
    matchAny(["https://github.com/mondary"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* ==UserStyle==\n@name           GitHub – Mondary Repo Tiles v1.0.6\n@namespace      github.com\n@version        1.0.6\n@description    Grille compacte 4 colonnes, texte plus petit, Private rouge, graph espacé des boutons Star.\n@author         Clément\n==/UserStyle== */\n\n:root {\n    --cm-card-bg: #ffffff;\n    --cm-card-border: #d0d7de;\n    --cm-card-radius: 10px;\n    --cm-card-shadow: 0 3px 10px rgba(31, 35, 40, 0.08);\n    --cm-card-gap: 12px;\n    --cm-card-padding-y: 10px;\n    --cm-card-padding-x: 12px;\n\n    --cm-font-size: 13px;\n    --cm-meta-font-size: 11px;\n  }\n\n  /* ==============================\n   *  GRILLE 4 COLONNES\n   * ============================== */\n\n  #user-repositories-list > ul {\n    display: grid !important;\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: var(--cm-card-gap);\n    padding: 0 !important;\n    margin: 0 !important;\n  }\n\n  /* 3 colonnes si largeur moyenne */\n  @media (max-width: 1200px) {\n    #user-repositories-list > ul {\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n    }\n  }\n\n  /* 2 colonnes */\n  @media (max-width: 900px) {\n    #user-repositories-list > ul {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n\n  /* 1 colonne mobile */\n  @media (max-width: 640px) {\n    #user-repositories-list > ul {\n      grid-template-columns: 1fr !important;\n      gap: 8px;\n    }\n  }\n\n  #user-repositories-list {\n    font-size: var(--cm-font-size);\n  }\n\n  #user-repositories-list > ul > li {\n    list-style: none;\n    background: var(--cm-card-bg);\n    border: 1px solid var(--cm-card-border) !important;\n    border-radius: var(--cm-card-radius) !important;\n    box-shadow: var(--cm-card-shadow);\n    padding: var(--cm-card-padding-y) var(--cm-card-padding-x);\n    margin: 0 !important;\n\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 6px;\n\n    border-bottom: none !important;\n    overflow: hidden;\n  }\n\n  #user-repositories-list > ul > li:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 5px 16px rgba(31, 35, 40, 0.14);\n    transition: box-shadow 120ms ease, transform 120ms ease;\n  }\n\n  /* ==============================\n   *  FLATTEN COLONNES\n   * ============================== */\n\n  #user-repositories-list > ul > li > .col-10,\n  #user-repositories-list > ul > li > .col-12,\n  #user-repositories-list > ul > li > .col-2,\n  #user-repositories-list > ul > li > .col-lg-9,\n  #user-repositories-list > ul > li > .col-lg-3 {\n    float: none !important;\n    width: 100% !important;\n    max-width: 100% !important;\n  }\n\n  /* Footer droite : stars + graph */\n  #user-repositories-list > ul > li > .col-2,\n  #user-repositories-list > ul > li > .col-lg-3 {\n    display: flex !important;\n    flex-direction: row !important;\n    align-items: flex-end;\n    justify-content: flex-end;\n    gap: 6px; /* espace entre bloc stars et graph */\n    margin-top: 6px;\n    padding-top: 4px;\n    padding-inline: 4px 8px;\n  }\n\n  /* ==============================\n   *  TITRE\n   * ============================== */\n\n  #user-repositories-list h3 {\n    font-size: 14px !important;\n    margin: 0 0 2px 0 !important;\n  }\n\n  #user-repositories-list h3 a {\n    text-decoration: none;\n  }\n\n  #user-repositories-list h3 a:hover {\n    text-decoration: underline;\n  }\n\n  /* ==============================\n   *  BADGE PRIVATE\n   * ============================== */\n\n  #user-repositories-list span:contains(\"Private\") {\n    background: linear-gradient(135deg, #ff4d4d, #b31212) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(0, 0, 0, 0.2) !important;\n\n    font-weight: 700 !important;\n    letter-spacing: 0.25px;\n    font-size: 10px !important;\n\n    padding: 1px 8px !important;\n    border-radius: 999px !important;\n\n    box-shadow:\n      0 2px 5px rgba(179, 18, 18, 0.4),\n      inset 0 0 0 1px rgba(255,255,255,0.25);\n  }\n\n  #user-repositories-list span:contains(\"Private\")::before {\n    content: \"🔒 \";\n  }\n\n  /* ==============================\n   *  DESCRIPTION FULL WIDTH\n   * ============================== */\n\n  #user-repositories-list > ul > li p {\n    display: block !important;\n    width: 100% !important;\n    max-width: 100% !important;\n    padding-right: 0 !important;\n    margin: 0 0 4px 0 !important;\n    font-size: var(--cm-font-size);\n  }\n\n  /* ==============================\n   *  MÉTA (LANGAGE, DATE…)\n   * ============================== */\n\n  #user-repositories-list .f6 {\n    font-size: var(--cm-meta-font-size) !important;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 4px;\n    align-items: center;\n    color: #57606a !important;\n  }\n\n  /* ==============================\n   *  BOUTONS STAR\n   * ============================== */\n\n  #user-repositories-list form button,\n  #user-repositories-list details summary[role=\"button\"] {\n    font-size: 11px !important;\n    padding: 2px 7px !important;\n    border-radius: 999px !important;\n  }\n\n  /* ==============================\n   *  GRAPH (SPARKLINE)\n   * ============================== */\n\n  #user-repositories-list > ul > li .text-right {\n    padding-right: 0;\n  }\n\n  #user-repositories-list > ul > li .text-right svg {\n    display: block;\n    max-width: 120px;\n    margin-left: auto;\n  }";
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
