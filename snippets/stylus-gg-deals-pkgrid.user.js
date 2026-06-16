// ==UserScript==
// @name         Stylus - gg.deals - PKgrid
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=42, sha1=069716e7)
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
    matchAny(["https://gg.deals/wishlist/*"], (p) => href.startsWith(p)) || matchAny(["gg.deals"], domainMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* 1. Styles pour le conteneur principal des cartes (la grille responsive) */\n.d-flex.flex-wrap.relative.list-items {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Crée des colonnes réactives avec une largeur minimale de 250px */\n  gap: 20px; /* Ajoute un espacement de 20px entre les cartes */\n}\n\n/* 2. Styles pour chaque carte individuelle (pour la rendre verticale et gérer l'overflow) */\n.hoverable-box.with-full-link.game-box-options.game-collections-item {\n  display: flex; /* Active Flexbox pour la carte */\n  flex-direction: column; /* Empile les éléments internes verticalement */\n  align-items: stretch; /* Les éléments s'étirent pour prendre toute la largeur disponible */\n  justify-content: flex-start; /* Aligne les éléments au début de l'axe principal (haut) */\n  width: 100%; /* S'assure que la carte prend toute la largeur de sa cellule de grille */\n  height: auto; /* Permet à la carte de s'adapter à la hauteur de son contenu */\n  box-sizing: border-box; /* Inclut le padding et les bordures dans la largeur/hauteur de l'élément */\n  /* Supprime les propriétés Grid si elles étaient précédemment appliquées directement à la carte */\n  grid-template-columns: unset;\n  grid-template-rows: unset;\n}\n\n/* 3. Ordre et dimensionnement de l'image à l'intérieur de chaque carte */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-image.with-checkbox {\n  order: -2; /* Place l'image tout en haut */\n  width: 100%; /* L'image prend toute la largeur de la carte */\n  height: auto; /* Maintient le ratio de l'image */\n  box-sizing: border-box;\n}\n\n/* 4. Ordre et alignement du lien de la boutique à l'intérieur de chaque carte */\n.hoverable-box.with-full-link.game-box-options.game-collections-item a.shop-link {\n  order: -1; /* Place le lien de la boutique après l'image */\n  width: 100%;\n  display: flex; /* Permet d'utiliser justify-content */\n  justify-content: center; /* Centre le contenu du lien de la boutique */\n  box-sizing: border-box;\n}\n\n/* 5. Ordre et gestion du débordement du conteneur d'informations (titre, tags, prix) */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-info-wrapper {\n  order: 0; /* Place le conteneur d'informations après le lien de la boutique */\n  width: 100%;\n  max-width: 100%; /* S'assure qu'il ne dépasse pas 100% de la largeur de son parent */\n  overflow: hidden; /* Cache le contenu qui déborde du wrapper */\n  box-sizing: border-box;\n  min-width: 0; /* Important pour que les éléments flex internes puissent se réduire */\n}\n\n/* 6. Gestion du débordement et de l'affichage pour le wrapper du titre */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-info-wrapper .game-info-title-wrapper {\n  max-width: 100%;\n  overflow: hidden;\n  box-sizing: border-box;\n  display: flex; /* Utilise flexbox pour aligner les éléments du titre */\n  flex-wrap: nowrap; /* Empêche les éléments du titre de passer à la ligne */\n  min-width: 0; /* Permet au wrapper de se réduire */\n}\n\n/* 7. Gestion du débordement pour le titre du jeu lui-même */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-info-wrapper .game-info-title-wrapper .game-info-title {\n  flex-shrink: 1; /* Permet au titre de se réduire si l'espace est limité */\n  min-width: 0; /* Important pour que le texte puisse être tronqué */\n  overflow: hidden; /* Cache le texte qui dépasse */\n  white-space: nowrap; /* Empêche le texte de passer à la ligne */\n  text-overflow: ellipsis; /* Ajoute des points de suspension (...) pour le texte tronqué */\n  box-sizing: border-box;\n}\n\n/* 8. Empêche les icônes d'action du titre de se réduire */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-info-wrapper .game-info-title-wrapper .game-collection-actions {\n  flex-shrink: 0; /* Empêche ces éléments de se réduire */\n  min-width: 0; /* Évite des problèmes de calcul de largeur dans un conteneur flex */\n}\n\n/* 9. Gestion du débordement pour les tags de jeu */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-info-wrapper .game-tags.game-tags-deal {\n  max-width: 100%;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n\n/* 10. Réduction de la hauteur de moitié pour toutes les icônes de boutique */\nspan.shop-icon {\n  height: 34px !important; /* Exemple: 68px divisé par 2 */\n  display: flex !important;\n  align-items: center !important;\n  overflow: hidden !important;\n}\n\nspan.shop-icon img {\n  max-height: 34px !important; /* Assure que les images s'adaptent à la nouvelle hauteur */\n  width: auto !important; /* Maintient le ratio d'aspect */\n}\n\nspan.shop-icon svg.svg-icon {\n  height: 34px !important; /* Assure que les SVG s'adaptent à la nouvelle hauteur */\n  width: auto !important; /* Maintient le ratio d'aspect */\n}\n\n/* 11. Masquer les tags du système d'exploitation (OS) */\n.platforms-tag {\n  display: none !important;\n}\n\n/* 12. Masquer les tags d'avertissement (risques) */\n.hidden-mobile.tag-badge.tag-risks.tag {\n  display: none !important;\n}\n\n/* 13. Masquer l'âge de l'offre */\n.time-icon-tag.tag {\n  display: none !important;\n}";
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
