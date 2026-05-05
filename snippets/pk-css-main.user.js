// ==UserScript==
// @name         PK CSS - main
// @namespace    https://local.scriptcat.sync
// @version      1.0.0
// @description  Auto-generated CSS injector for main.css
// @match        https://mail.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  const css = "/* Custom Tabs */\nbody.custom-tabs .aKk {\n    background-color: #f6f8fa;\n    border-radius: 4px;\n}\n\n/* New Message Button */\nbody.new-message-button .T-I-KE {\n    background-color: #1a73e8;\n    color: white;\n    border-radius: 24px;\n    padding: 0 24px;\n}\n\n/* Short Labels */\nbody.short-labels .ar {\n    max-width: 100px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n/* Sender Icons */\nbody.sender-icons .yW {\n    width: 24px;\n    height: 24px;\n    border-radius: 50%;\n    margin-right: 8px;\n}\n\n/* Compose Button */\nbody.compose-button .T-I-KE {\n    background-color: #1a73e8;\n    color: white;\n}\n\n/* Margin */\nbody.margin .AO {\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n/* No Left Menu */\nbody.no-left-menu .nH.oy8Mbf {\n    display: none;\n}\n\n/* Grey Scrollbar */\nbody.scroll-bar-grey ::-webkit-scrollbar-thumb {\n    background-color: #dadce0;\n}\n\n/* Search Bar Center */\nbody.search-bar-center .gb_ke {\n    justify-content: center;\n}\n\n/* Stacked Layout */\nbody.stacked .Cp {\n    display: flex;\n    flex-direction: column;\n}\n\n/* Sticky Topic */\nbody.sticky-topic .ha {\n    position: sticky;\n    top: 0;\n    background: white;\n    z-index: 1;\n}\n\n/* Top Right Buttons */\nbody.top-right-buttons .G-atb {\n    position: fixed;\n    top: 8px;\n    right: 16px;\n}\n\n/* Unread Color */\nbody.unread-color .zE {\n    background-color: #e8f0fe;\n}\n\n/* White Style */\nbody.white-style {\n    background-color: white;\n}\nbody.white-style .nH {\n    background-color: white;\n}";
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();
