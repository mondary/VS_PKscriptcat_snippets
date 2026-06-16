// ==UserScript==
// @name         Stylus - PK sticky Youtube
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=26, sha1=c91e7917)
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
    matchAny(["https://www.youtube.com/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = "/* styles.css */\n\n/* Style général pour le conteneur du player */\n#player-container {\n    position: relative;\n    width: 100%;\n    height: auto;\n}\n\n/* Style pour rendre le lecteur sticky */\n.html5-main-video.video-stream {\n    position: fixed;\n    top: 10px; /* Ajuste la distance par rapport au haut de la page */\n    right: 10px; /* Ajuste la distance par rapport au côté droit de la page */\n    width: 560px; /* Ajuste la largeur selon tes besoins */\n    height: auto; /* Garde l'aspect ratio de la vidéo */\n    z-index: 1000; /* S'assure que le lecteur est au-dessus des autres éléments */\n}\n\n/* Style général pour le contenu de la page */\n.content {\n    margin-top: 350px; /* Ajoute un margin-top pour éviter de chevaucher le lecteur */\n    padding: 20px;\n    background-color: #f0f0f0;\n    height: 2000px; /* Juste pour démonstration, pour avoir un long contenu à scroller */\n}";
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
