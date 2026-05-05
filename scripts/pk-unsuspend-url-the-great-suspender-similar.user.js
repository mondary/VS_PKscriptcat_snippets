// ==UserScript==
// @name         Unsuspend URL (The Great Suspender / similar)
// @namespace    scriptcat
// @version      1.0.0
// @description  Extrait et decode le parametre url= depuis une page suspended.html puis copie/ouvre l'URL reelle.
// @match        *://*/*
// @grant        GM_setClipboard
// @grant        GM_openInTab
// ==/UserScript==

(function () {
  'use strict';

  function decodeOnce(s) {
    try { return decodeURIComponent(s.replace(/\+/g, '%20')); }
    catch { return s; }
  }

  function extractRealUrlFromSuspended(u) {
    // u peut etre une string (URL) ou un objet URL
    let urlObj;
    try {
      urlObj = (u instanceof URL) ? u : new URL(u, location.href);
    } catch {
      return null;
    }

    // Cas standard: .../suspended.html?...&url=ENCODED&time=...
    const param = urlObj.searchParams.get('url');
    if (param) return decodeOnce(param);

    return null;
  }

  function isSuspendedPage(urlString) {
    return /\/suspended\.html(\?|$)/.test(urlString);
  }

  function runOnCurrentPageIfSuspended() {
    // Si tu es directement sur la page suspended.html
    if (!isSuspendedPage(location.href)) return;

    const real = extractRealUrlFromSuspended(location.href);
    if (!real) return;

    // copie dans le presse-papiers
    if (typeof GM_setClipboard === 'function') {
      GM_setClipboard(real);
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(real).catch(() => {});
    }

    // Optionnel: ouvrir automatiquement
    // GM_openInTab(real, { active: true, insert: true });

    console.log('[Unsuspend URL] URL extraite :', real);
  }

  // Expose une fonction globale pour usage manuel depuis la console si besoin
  window.__unsuspendUrl = function (inputUrl) {
    const real = extractRealUrlFromSuspended(inputUrl);
    if (!real) return null;

    if (typeof GM_setClipboard === 'function') {
      GM_setClipboard(real);
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(real).catch(() => {});
    }
    return real;
  };

  runOnCurrentPageIfSuspended();
})();
