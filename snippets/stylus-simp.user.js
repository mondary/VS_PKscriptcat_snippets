// ==UserScript==
// @name         Stylus - simp
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=38, sha1=46adf266)
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

  let css = "/* ==UserStyle==\n@name          Simplify Gmail – Ultra Minimal\n@namespace     http://userstyles.org\n@description   Gmail réduit à l’essentiel : liste de mails et rien d’autre\n@version       1.0\n==/UserStyle== */\n\n/* 1) Tout en blanc, police fine */\nbody, .aeF, .nH, .nH .aeF, .nH .nH.Hd {\n  background: #fff !important;\n  color: #222 !important;\n  font-family: sans-serif !important;\n  font-size: 13px !important;\n  line-height: 1.3 !important;\n}\n\n/* 2) Masquer TOUTE la barre du haut (logo, recherche, paramètres) */\n.gb_uc, .gb_gd, .gb_pc, .gb_We, .gb_hd, .gb_Sg,\n.gb_js, .gb_ls {\n  display: none !important;\n}\n\n/* 3) Masquer le panneau de gauche (icônes et labels) */\n.TN.bzz, .aio.UKr6le, .aio {\n  display: none !important;\n}\n\n/* 4) Ne garder que la liste des messages */\ndiv[role=\"main\"] > .nH.aJl {\n  display: block !important;\n}\ndiv[role=\"main\"] > .nH.aJl ~ * {\n  display: none !important;\n}\n\n/* 5) Fils de discussion centrés, largeur 100% */\n.nH .aeF, .nH .nH.Hd {\n  max-width: none !important;\n  margin: 0 !important;\n  padding: 0 10px !important;\n}\n\n/* 6) Lignes de messages – très léger séparateur */\n.zA {\n  border-bottom: 1px solid #eee !important;\n  padding: 6px 0 !important;\n}\n.zA:hover {\n  background: #fcfcfc !important;\n}\n\n/* 7) Masquer tous les boutons (Compose, actions, pagination) */\n.T-I, .T-I.J-J5-Ji, .ar.as, .G-tF {\n  display: none !important;\n}\n\n/* 8) Barre de scroll aussi discrète que possible */\n::-webkit-scrollbar {\n  width: 4px;\n}\n::-webkit-scrollbar-track {\n  background: #fff;\n}\n::-webkit-scrollbar-thumb {\n  background: #ddd;\n  border-radius: 2px;\n}\n\n/* 9) Liens et labels inline très discrets */\n.zF, .y6, .yX {\n  font-weight: normal !important;\n  color: #555 !important;\n}\n\n/* 10) Vue message désactivée */\n.nH.Hd {\n  display: none !important;\n}";
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
