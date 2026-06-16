// ==UserScript==
// @name         Stylus - simp2
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=39, sha1=6bc1ddad)
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

  let css = "/* ==UserStyle==\n@name          Simplify Gmail – Ultra Minimal v1.4\n@namespace     http://userstyles.org\n@description   Ultra minimal : tout blanc, pas d’ombres, pas de séparateurs, scrollbar cachée, barre de recherche blanche, indication étoiles\n@version       1.4\n==/UserStyle== */\n\n/* 1) Fond et texte */\nbody,\n.aeF,\n.nH,\n.nH .aeF {\n  background: #fff !important;\n  color: #222 !important;\n  font-family: sans-serif !important;\n  font-size: 13px !important;\n  line-height: 1.3 !important;\n}\n\n/* 2) Masquer barre du haut et panneau gauche */\n.gb_uc, .gb_gd, .gb_pc, .gb_We, .gb_hd, .gb_Sg,\n.gb_js, .gb_ls,\n.TN.bzz, .TN.bzz .aio.UKr6le, .TN.bzz .aio {\n  display: none !important;\n}\n\n/* 3) Liste des messages uniquement */\ndiv[role=\"main\"] > .nH.aJl {\n  display: block !important;\n}\ndiv[role=\"main\"] > .nH.aJl ~ * {\n  display: none !important;\n}\n.nH.Hd {\n  display: none !important;\n}\n\n/* 4) Lignes de messages – plus de séparateurs ni d’ombres */\n.zA {\n  border: none !important;\n  box-shadow: none !important;\n  padding: 6px 0 !important;\n  background: #fff !important;\n  transition: background-color 0.3s ease, box-shadow 0.3s ease;\n}\n\n/* 5) Effet hover ultra discret */\n.zA:hover {\n  background: #f9f9f9 !important;\n}\n\n/* 6) Sélection de ligne */\n.zA[aria-selected=\"true\"] {\n  background: #f2f2f2 !important;\n}\n\n/* 7) Messages non lus */\n.zA.zE {\n  font-weight: bold !important;\n  background: #fff !important;\n}\n\n/* 8) Texte sujet/expéditeur */\n.zA .y6 span,\n.zA .bqe,\n.zA .yW span {\n  color: #333 !important;\n  font-weight: normal !important;\n}\n\n/* 9) Message individuel – tout blanc, sans ombres ni bordures */\n.adn .ii,\n.a3s {\n  background: #fff !important;\n  box-shadow: none !important;\n  border: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n\n/* 10) En‑tête du message – sans fond ni ombre */\n.hP,\n.gD {\n  background: none !important;\n  color: #1a1a1a !important;\n  box-shadow: none !important;\n}\n\n/* 11) Boutons “Compose” et actions – conservent leur style épuré */\n.T-I.J-J5-Ji,\n.T-I.T-I-KE.L3,\n[role=\"button\"] {\n  background: #fff !important;\n  color: #444 !important;\n  border: none !important;\n  box-shadow: none !important;\n  padding: 4px 6px !important;\n  border-radius: 4px !important;\n  opacity: 0.6 !important;\n}\n.T-I.J-J5-Ji:hover,\n.T-I.T-I-KE.L3:hover {\n  background: #f0f0f0 !important;\n  opacity: 1 !important;\n}\n\n/* 12) Cacher compléments (Chat/Meet…) */\ndiv[role=\"complementary\"],\n.nH.aJl ~ .nH.aJl {\n  display: none !important;\n}\n\n/* 13) Scrollbar masquée */\n::-webkit-scrollbar {\n  display: none;\n}\n* {\n  scrollbar-width: none !important;\n  -ms-overflow-style: none !important;\n}\n\n/* 14) Barre de recherche – conteneur stylé */\n#aso_search_form_anchor,\ndiv[role=\"search\"] {\n  background-color: #fff !important;\n  margin: auto !important;\n  padding: 8px 0 !important;\n  box-shadow: none !important;\n  border: none !important;\n}\n\n/* 15) Input de recherche – sans contour ni bleu */\n#aso_search_form_anchor input[type=\"text\"],\ndiv[role=\"search\"] input[type=\"text\"],\ninput[aria-label*=\"Rechercher\"],\ninput[aria-label*=\"Search\"],\ninput[type=\"search\"],\ninput[type=\"text\"] {\n  background-color: #fff !important;\n  color: #222 !important;\n  border: none !important;\n  box-shadow: none !important;\n  outline: none !important;\n  width: calc(100% - 16px) !important;\n  margin: 0 8px !important;\n}\n\n/* 16) Espacements top/bottom comme .w-asV */\n.w-asV,\ndiv[role=\"search\"] > * {\n  margin-top: 16px !important;\n  margin-bottom: 16px !important;\n}\n\n/* 17) Indication pour les messages étoilés */\n.zA:has(.T-KT:not(.aXw)) {\n  background-color: #fefcf4 !important;  /* jaune doux crème */\n  border-left: 4px solid #ffc107 !important;  /* bande couleur ambre */\n  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05) !important;\n}\n\n/* 18) Supprimer toutes les ombres restantes */\n* {\n  box-shadow: none !important;\n}";
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
