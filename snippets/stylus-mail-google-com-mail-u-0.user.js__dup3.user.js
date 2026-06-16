// ==UserScript==
// @name         Stylus - mail.google.com/mail/u/0/
// @namespace    https://local.stylus.import
// @version      1.0.1
// @description  Imported from Stylus export (id=24, sha1=668b7889)
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
    matchAny(["https://mail.google.com/*"], urlRuleMatches)
  );
  return ok;
  };
  if (!shouldRun()) return;

  // JS payload from Stylus section(s)
  (function(){
    // Sélectionnez les éléments .l7 et .nH
    const l7Element = document.querySelector('.l7');
    const nHElement = document.querySelector('.nH');
    
    // Vérifiez si les éléments existent sur la page
    if (l7Element && nHElement) {
        // Déplacez l'élément .l7 juste avant l'élément .nH
        nHElement.parentNode.insertBefore(l7Element, nHElement);
    }
  })();

})();
