// ==UserScript==
// @name        GG.deals New Deals Grid View (Corrected)
// @namespace   Violentmonkey Scripts
// @match       https://gg.deals/deals/new-deals/
// @grant       none
// @version     1.2
// @author      Gemini
// @description Displays the new deals on GG.deals in a grid layout, with dynamic updates and corrected selectors.
// ==/UserScript==

(function() {
    'use strict';

    const DEALS_CONTAINER_SELECTOR = '.d-flex.flex-wrap.relative.list-items'; // Corrected container selector
    const DEAL_ITEM_SELECTOR = '.deal-list-item'; // Selector for individual deal items

    function applyGridLayout() {
        const dealsContainer = document.querySelector(DEALS_CONTAINER_SELECTOR);
        if (dealsContainer) {
            dealsContainer.style.display = 'grid';
            dealsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
            dealsContainer.style.gap = '20px';
            console.log('GG.deals Grid Layout Applied!');
        } else {
            console.log('GG.deals Deals container not found.');
        }
    }

    // Function to observe DOM changes
    function observeDOM() {
        const targetNode = document.querySelector(DEALS_CONTAINER_SELECTOR);
        if (!targetNode) {
            console.log('GG.deals Deals container not found for observation, retrying...');
            setTimeout(observeDOM, 1000); // Retry observation setup
            return;
        }

        const config = { childList: true, subtree: true };

        const callback = function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if added nodes contain deal items or are the deal items themselves
                    const newDealItems = Array.from(mutation.addedNodes).some(node =>
                        node.nodeType === 1 && (node.matches(DEAL_ITEM_SELECTOR) || node.querySelector(DEAL_ITEM_SELECTOR))
                    );
                    if (newDealItems) {
                        console.log('New deal items detected, re-applying grid layout.');
                        applyGridLayout();
                        // No need to break, as applyGridLayout will apply to the container
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        console.log('GG.deals MutationObserver started.');
    }

    // Initial application of layout and start observation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applyGridLayout();
            observeDOM();
        });
    } else {
        applyGridLayout();
        observeDOM();
    }
})();
