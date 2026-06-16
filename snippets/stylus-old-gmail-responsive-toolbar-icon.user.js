// ==UserScript==
// @name         Stylus - OLD Gmail- responsive toolbar icon
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=4, sha1=4ba339e3)
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

  let css = "/* Rendre la barre d'outils de Gmail responsive et adapter les boutons */\n\n/* Sélection des conteneurs possibles pour la barre d'outils */\n.G-tF, .inboxsdk__thread_toolbar_parent.E.D.G-atb, .aeH {\n    display: flex;\n    flex-wrap: wrap; /* Permet aux boutons de passer à la ligne si nécessaire */\n    gap: 4px; /* Espacement entre les boutons */\n    justify-content: flex-start; /* Aligner les boutons à gauche */\n    padding-bottom: 8px; /* Ajoute de l'espace pour éviter le chevauchement */\n}\n\n/* Ajustement des boutons pour une meilleure répartition */\n.G-tF .Bn, .inboxsdk__thread_toolbar_parent .Bn, .aeH .Bn {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 4px;\n    justify-content: flex-start;\n}\n\n.Bn .T-I {\n    min-width: 48px; /* Empêche les boutons de devenir trop petits */\n    flex: 1 1 auto; /* Permet aux boutons de s'adapter à l'espace disponible */\n    max-width: 100px; /* Évite qu'ils ne deviennent trop larges */\n}\n\n\n\n/* Ajustement de PAGES + FR */\n.adF {\n    margin-top: 46px; /* Décale vers le bas pour éviter l'écrasement */\n}\n\n\n\n\n\n\n/* Ajustement au dessus du séparateur pour éviter le chevauchement */\n.aeH {\n    min-height: 45px;\n}\n\n/* Ajustement en desosus du séparateur */\n.inboxsdk__thread_toolbar_parent.E.D.G-atb {\n    min-height: auto;\n    padding-bottom: 45px;\n}";
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
