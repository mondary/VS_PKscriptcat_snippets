// ==UserScript==
// @name         Stylus - store.steampowered.com/app/1174180/Red_Dead_Redemption_2/
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=29, sha1=bc9e473a)
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
    matchAny(["https://store.steampowered.com/"], (p) => href.startsWith(p))
  );
  return ok;
  };
  if (!shouldRun()) return;

  let css = ".game_area_description {\n    display: none;\n}\n\n.package_group {\n    display: none;\n}\n\n.responsive_apppage_details_right.block:nth-of-type(12) {\n    display: none;\n}\n.responsive_apppage_reviewblock.block:nth-of-type(19) {\n    display: none;\n}\n\n#appDetailsUnderlinedLinks {\n    display: none;\n}\n\n#awardsTable {\n    display: none;\n}\n\n.btn_medium.btnv6_blue_hoverfade:nth-of-type(5) {\n    display: none;\n}\n\n#ReportAppBtn\n {\n    display: none;\n}\n\n\n/* liste des amis */\n.heading.responsive_apppage_details_right.block\n,p.for.reason:nth-of-type(2)\n,p.for.reason:nth-of-type(3)\n,p.for.reason:nth-of-type(4)\n,div.friend_blocks_grid:nth-of-type(1)\n,hr:nth-of-type(1)\n,hr:nth-of-type(2)\n,hr:nth-of-type(3)\n{\n    display: none;\n}\n\n/* Injection JS en utilisant un élément caché */\nbody::after {\n    content: '';\n    display: none; /* Ne s'affiche pas */\n}\n\nbody::before {\n    content: 'alert(\"Script injecté avec succès !\");';\n    display: none; /* Ne s'affiche pas */\n}";
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
