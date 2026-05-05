// ==UserScript==
// @name         PK CSS GGDeals Colors
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Améliore les couleurs des icônes et backgrounds sur GGDeals
// @author       cmondary
// @match        https://gg.deals/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        /*
        TAG ICONS COLOR
        */
        .svg-icon-wishlist-fill {
            color: #ff47f0;
        }
        .svg-icon-owned-fill {
            color: #279af1;
        }
        .svg-icon-platform-geforce-now.svg-icon {
            color: #00ff02;
        }

        /*
        DRM ICONS COLOR
        */
        .svg-icon-drm-prime-gaming {
            color: #ff0;
        }
        .svg-icon-drm-steam {
            color: #279af1;
        }
        .svg-icon-drm-epic-games {
            color: #be2130;
        }
        .svg-icon-drm-gog {
            color: #ba5ffb;
        }

        /*
        DRM STORE ICONS COLOR
        */
        .tippy-initialized.svg-icon-drm-steam {
            color: #279af1;
        }

        /*
        V2 BACKGROUND
        */
        .owned {
            background-color: #008fffbf;
        }

        .owned.wishlisted {
            background: linear-gradient(0.5turn, #279af1, #ff48f1d6);
        }
        .wishlisted {
            background-color: #fa00e65c;
        }

        .owned.with-checkbox {
            background-color: #353448;
        }
        .wishlisted.with-checkbox {
            background-color: #353448;
        }
        .with-image.site-banner-content-widget {
            display: none;
        }
    `;
    document.head.appendChild(style);

})();
