// ==UserScript==
// @name         Stylus - simplify
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=37, sha1=f8697ff2)
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
    matchAny(["https://mail.google.com/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* ==UserStyle==\n@name          Simplify Gmail (Stylus)\n@namespace     http://userstyles.org\n@description   Minimaliste et épuré, façon “Simplify for Gmail”\n@version       1.0\n@require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js\n==/UserStyle== */\n\n/* 1) Police et mise en page générale */\nbody, .aeF {\n  font-family: \"Roboto\", sans-serif !important;\n  font-size: 14px !important;\n  line-height: 1.4 !important;\n  color: #202124 !important;\n  background: #fafafa !important;\n}\n\n/* 2) Barre supérieure : logo + espace inutile */\n.gb_gd,           /* Google logo texte */\n.gb_pc,           /* Boutons Google Apps */\n.gb_We {          /* Profil */\n  display: none !important;\n}\n.gb_xa.gb_hd.gb_Sg.gb_ae {  /* icône Gmail minimaliste */\n  display: inline-block !important;\n  margin-left: 12px !important;\n}\n\n/* 3) Barre de gauche : icônes seulement, pas de texte */\n.TN.bzz.aHS-bnv { /* conteneur principal nav */\n  width: 56px !important;\n}\n.TN.bzz .aio.UKr6le { /* textes “Boîte de réception”, etc. */\n  display: none !important;\n}\n.TN.bzz .aio { /* icônes */\n  width: 56px !important;\n  justify-content: center !important;\n}\n\n/* 4) Masquer le panneau de droite (Chat / Meet) */\ndiv[role=\"complementary\"],\n.gb_wb .gb_2d.gb_Le { /* Gmail Meet/Chat */\n  display: none !important;\n}\n\n/* 5) Masquer les onglets Sociale / Promotions, etc. */\n.aKz {             /* barre d’onglets principale */\n  display: none !important;\n}\n\n/* 6) Élément “Paramètres rapides” discret */\n.T-I.J-J5-Ji {     /* bouton ⚙ */\n  opacity: 0.3 !important;\n}\n.T-I.J-J5-Ji:hover {\n  opacity: 1 !important;\n}\n\n/* 7) Largeur du fil de conversation fixée */\n.nH .aeF {         /* vue liste */\n  max-width: 800px !important;\n  margin: auto !important;\n}\n\n/* 8) Fils de discussion plein largeur */\n.nH .nH.Hd {       /* vue message */\n  max-width: 800px !important;\n  margin: auto !important;\n}\n\n/* 9) Supprimer les bordures et ombres superflues */\n.zA, .aeF {        /* lignes et conteneur */\n  border: none !important;\n  box-shadow: none !important;\n}\n\n/* 10) Indicateur de sélection allégé */\n.zA.zE {           /* non lus */\n  font-weight: normal !important;\n}\n.zA[aria-selected=\"true\"] {\n  background: #e8f0fe !important;\n}";
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
