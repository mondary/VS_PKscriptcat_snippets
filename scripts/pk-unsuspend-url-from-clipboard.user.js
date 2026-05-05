// ==UserScript==
// @name         Unsuspend URL from Clipboard
// @namespace    scriptcat
// @version      1.0.0
// @description  Decode suspended.html?url=... from clipboard and copy the real URL
// @match        *://*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
  'use strict';

  function safeDecode(s) {
    try { return decodeURIComponent(s.replace(/\+/g, '%20')); }
    catch { return s; }
  }

  function extractRealUrl(anyUrl) {
    let u;
    try {
      u = new URL(anyUrl);
    } catch {
      return null;
    }
    const encoded = u.searchParams.get('url');
    if (!encoded) return null;
    return safeDecode(encoded);
  }

  async function readClipboardText() {
    // Fallback si navigator.clipboard est bloquÃ©
    if (navigator.clipboard?.readText) {
      try { return await navigator.clipboard.readText(); } catch {}
    }
    return null;
  }

  async function writeClipboardText(text) {
    // PrioritÃ© au GM_setClipboard si dispo
    if (typeof GM_setClipboard === 'function') {
      try { GM_setClipboard(text); return true; } catch {}
    }
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return true; } catch {}
    }
    return false;
  }

  async function run() {
    const clip = await readClipboardText();
    if (!clip) {
      console.log('[Unsuspend] Clipboard unreadable (permission).');
      return;
    }

    const real = extractRealUrl(clip.trim());
    if (!real) {
      console.log('[Unsuspend] No suspended url= param found in clipboard.');
      return;
    }

    const ok = await writeClipboardText(real);
    console.log(ok
      ? `[Unsuspend] Copied real URL: ${real}`
      : `[Unsuspend] Real URL extracted but could not copy: ${real}`
    );
  }

  // Expose pour lancement manuel si besoin
  // Dans ScriptCat, tu peux aussi juste "Run" le script.
  window.unsuspendFromClipboard = run;
})();
