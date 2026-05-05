// ==UserScript==
// @name         GitHub License Stickers
// @namespace    https://github.com/mondary
// @version      0.3.0
// @description  Met en Ã©vidence les licences GitHub sous forme de stickers propres.
// @author       cmondary
// @homepageURL  https://github.com/mondary
// @supportURL   https://github.com/mondary
// @match        https://github.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const LICENSES = [
    { key: "gpl", regex: /\b(A?GPL|LGPL|GPL)[-\s]?v?\d?(\.\d)?\b/i },
    { key: "mit", regex: /\bMIT\b/i },
    { key: "apache", regex: /\bApache\b/i },
    { key: "bsd", regex: /\bBSD\b/i },
    { key: "mpl", regex: /\bMPL\b|\bMozilla Public License\b/i },
    { key: "isc", regex: /\bISC\b/i },
    { key: "cc", regex: /\bCC0\b|\bCreative Commons\b|\bCC-BY\b/i },
    { key: "unlicense", regex: /\bUnlicense\b/i }
  ];

  function injectStyles() {
    if (document.getElementById("gh-license-stickers-css")) return;

    const style = document.createElement("style");
    style.id = "gh-license-stickers-css";
    style.textContent = `
      .gh-license-sticker {
        display: inline-flex !important;
        align-items: center !important;
        padding: 3px 8px !important;
        border-radius: 8px !important;
        border: 1px solid rgba(255,255,255,.85) !important;
        color: #fff !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        line-height: 1.2 !important;
        text-decoration: none !important;
        box-shadow:
          0 1px 2px rgba(0,0,0,.18),
          inset 0 0 0 1px rgba(255,255,255,.18) !important;
      }

      .gh-license-gpl { background: #d1242f !important; }
      .gh-license-mit { background: #2da44e !important; }
      .gh-license-apache { background: #fb8500 !important; }
      .gh-license-bsd { background: #8250df !important; }
      .gh-license-mpl { background: #0969da !important; }
      .gh-license-isc { background: #6e7781 !important; }
      .gh-license-cc { background: #bf3989 !important; }
      .gh-license-unlicense { background: #24292f !important; }
      .gh-license-unknown { background: #57606a !important; }
    `;

    document.head.appendChild(style);
  }

  function detectLicense(text) {
    for (const license of LICENSES) {
      if (license.regex.test(text)) return license;
    }
    if (/licen[cs]e/i.test(text)) return { key: "unknown" };
    return null;
  }

  function applySticker(element, license) {
    if (!element || element.dataset.licenseStickerDone === "true") return;

    element.dataset.licenseStickerDone = "true";

    element.classList.add("gh-license-sticker");
    element.classList.add(`gh-license-${license.key}`);

    // â ï¸ ON GARDE LE TEXTE ORIGINAL
    const originalText = element.textContent.trim();
    element.setAttribute("title", originalText);
    element.textContent = originalText;
  }

  function scan() {
    injectStyles();

    const elements = document.querySelectorAll(`
      a[href*="license"],
      a[href*="LICENSE"],
      a[href*="COPYING"],
      .Link--muted
    `);

    elements.forEach((el) => {
      const text = el.textContent?.trim();
      if (!text) return;

      const looksLikeLicense =
        /licen[cs]e/i.test(text) ||
        /GPL|MIT|Apache|BSD|MPL|ISC|Unlicense|CC/i.test(text);

      if (!looksLikeLicense) return;

      const license = detectLicense(text);
      if (!license) return;

      applySticker(el, license);
    });
  }

  scan();

  const observer = new MutationObserver(() => {
    setTimeout(scan, 150);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();