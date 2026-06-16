// ==UserScript==
// @name         Stylus - PKgrid test
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=45, sha1=4eb5ffb5)
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
    matchAny(["https://gg.deals/wishlist/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* 1. Grille responsive pour les cartes */\n.d-flex.flex-wrap.relative.list-items {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n\n/* 2. Carte verticale */\n.hoverable-box.with-full-link.game-box-options.game-collections-item {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  justify-content: flex-start;\n  width: 100%;\n  height: auto;\n  box-sizing: border-box;\n  grid-template-columns: unset;\n  grid-template-rows: unset;\n  position: relative; /* nécessaire pour full-link */\n}\n\n/* 3. Image en haut */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-image.with-checkbox {\n  order: -2;\n  width: 100%;\n  height: auto;\n  box-sizing: border-box;\n}\n\n/* 4. Lien boutique */\n.hoverable-box.with-full-link.game-box-options.game-collections-item a.shop-link {\n  order: -1;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n/* 5. Wrapper infos (titre, tags, prix) */\n.hoverable-box.with-full-link.game-box-options.game-collections-item .game-info-wrapper {\n  order: 0;\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 4px;\n}\n\n/* 6. Wrapper du titre */\n.hoverable-box.with-full-link.game-box-options.game-collections-item \n  .game-info-wrapper .game-info-title-wrapper {\n  max-width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  column-gap: 4px;\n  order: 1; /* TITRE en premier */\n}\n\n/* 7. Titre du jeu */\n.hoverable-box.with-full-link.game-box-options.game-collections-item \n  .game-info-wrapper .game-info-title-wrapper .game-info-title {\n  display: inline-block;\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  box-sizing: border-box;\n}\n\n/* 8. Icônes d’action */\n.hoverable-box.with-full-link.game-box-options.game-collections-item \n  .game-info-wrapper .game-info-title-wrapper .game-collection-actions {\n  flex-shrink: 0;\n  box-sizing: border-box;\n}\n\n/* 9. Tags du jeu */\n.hoverable-box.with-full-link.game-box-options.game-collections-item \n  .game-info-wrapper .game-tags.game-tags-deal {\n  max-width: 100%;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n\n/* 10. Ordre vertical forcé : PRIX en 2 */\n.price-inner.game-price-new {\n  order: 2 !important;\n}\n\n/* 11. Ordre vertical forcé : TAG DRM en 3 */\n.tag-drm.tag-icon.tag {\n  order: 3 !important;\n}\n\n/* 12. Icônes boutiques réduites */\nspan.shop-icon {\n  height: 34px !important;\n  display: flex !important;\n  align-items: center !important;\n  overflow: hidden !important;\n}\n\nspan.shop-icon img {\n  max-height: 34px !important;\n  width: auto !important;\n}\n\nspan.shop-icon svg.svg-icon {\n  height: 34px !important;\n  width: auto !important;\n}\n\n/* 13. Masquages */\n.platforms-tag {\n  display: none !important;\n}\n\n.hidden-mobile.tag-badge.tag-risks.tag {\n  display: none !important;\n}\n\n.time-icon-tag.tag {\n  display: none !important;\n}\n\n/* 14. Lien full-link = fond cliquable */\n.hoverable-box.with-full-link.game-box-options.game-collections-item > a.full-link {\n  position: absolute;\n  inset: 0;\n  display: block;\n  z-index: 1;\n}\n\n/* 15. Contenu visible au-dessus du full-link */\n.hoverable-box.with-full-link.game-box-options.game-collections-item > *:not(a.full-link) {\n  position: relative;\n  z-index: 2;\n}";
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
