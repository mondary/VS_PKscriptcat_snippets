// ==UserScript==
// @name         Stylus - OLD degueu chatgpt
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=36, sha1=0135ac17)
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

  let css = "/* STYLE ULTRA COMPACT, BLANC, SANS OMBRE, ACCENT NON LU, SIDEBAR VISIBLE */\n:root {\n  --primary: #222;\n  --background: #fff;\n  --card: #fff;\n  --border: #e3e3e3;\n  --unread: #eaf1fb;\n  --unread-accent: #4285f4;\n  --radius: 6px;\n  --font: 'Segoe UI', 'Arial', sans-serif;\n}\n\nbody, .aeF {\n  background: var(--background) !important;\n  font-family: var(--font) !important;\n  color: var(--primary) !important;\n  font-weight: 400 !important;\n  font-size: 14px !important;\n}\n\n/* Emails compacts, tout blanc, sans ombre, sans bordure inutile */\n.zA {\n  background: var(--card) !important;\n  border-radius: 0 !important;\n  border: none !important;\n  margin-bottom: 0 !important;\n  box-shadow: none !important;\n  padding: 4px 8px !important;\n  min-height: 0 !important;\n  transition: background 0.15s;\n}\n.zA:hover {\n  background: #f7fafd !important;\n}\n\n/* Accent non lu : fine ligne colorée à gauche */\n.zA:not(.yO) {\n  border-left: 3px solid var(--unread-accent) !important;\n  background: var(--card) !important;\n}\n\n/* Sidebar visible, compacte, blanche */\n.aqn {\n  min-width: 140px !important;\n  background: var(--card) !important;\n  border-radius: 0 !important;\n  border: none !important;\n  box-shadow: none !important;\n  font-size: 13px !important;\n}\n\n/* Barre de recherche compacte, blanche, sans ombre */\n#aso_search_form_anchor {\n  background: var(--card) !important;\n  border-radius: 0 !important;\n  border: 1px solid var(--border) !important;\n  margin: 8px auto 8px auto !important;\n  max-width: 600px;\n  padding: 0 8px !important;\n  box-shadow: none !important;\n}\n\n/* Pas de bouton flottant \"Nouveau mail\" */\n#pk-nouveau-mail-btn {\n  display: none !important;\n}\n\n/* Scrollbar subtile */\n::-webkit-scrollbar {\n  width: 8px;\n  background: var(--background);\n}\n::-webkit-scrollbar-thumb {\n  background: #e3e3e3;\n  border-radius: 8px;\n}\n\n/* Typo fine pour les labels importants */\n.bqe {\n  font-weight: 500 !important;\n  color: #222 !important;\n}\n\n.yO {\n  background: var(--card) !important;\n}\n\n/* Menus contextuels sans ombre, sans arrondi */\n.J-M {\n  border-radius: 0 !important;\n  box-shadow: none !important;\n}\n\n/* Sidebar Gmail visible (ne pas masquer) */\n.aeN, .ain .CJ, .gb_z.gb_gd.gb_f.gb_zf, .Yb.dIH7rb.bax {\n  display: initial !important;\n}\n\n/* Responsive compact */\n@media (max-width: 900px) {\n  #aso_search_form_anchor {\n    max-width: 98vw !important;\n    margin: 4px 1vw !important;\n  }\n  .zA {\n    padding: 2px 2px !important;\n  }\n}";
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
