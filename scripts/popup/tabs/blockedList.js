import { renderEmptyList } from "../../utils/renderEmptyList.js";
import { renderBlockedList } from "../../utils/renderBlockedList.js";
import {
  getBlockedSites,
  toggleBlockedSite,
} from "../../utils/storageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const blockedListTabElement = document.querySelector("#blocked-list-tab");
  const blockSiteButtonElement = document.querySelector("#block-site-button");

  const updateButtonState = (blockedSites, currentDomain) => {
    if (blockedSites.includes(currentDomain)) {
      blockSiteButtonElement.textContent = "Remove from blocked list";
    } else {
      blockSiteButtonElement.textContent = "Add to blocked list";
    }
  };

  const renderContent = (blockedSites) => {
    if (blockedSites.length === 0) {
      renderEmptyList(blockedListTabElement, chrome);
      return;
    }

    renderBlockedList(
      blockedListTabElement,
      blockedSites,
      chrome,
      (blockedSites) => {
        renderContent(blockedSites);
        updateButtonState(blockedSites);
      }
    );
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.length) return;

    const [{ url }] = tabs;
    const currentDomain = new URL(url).hostname;

    getBlockedSites((blockedSites) => {
      renderContent(blockedSites);
      updateButtonState(blockedSites, currentDomain);

      blockSiteButtonElement.addEventListener("click", () => {
        toggleBlockedSite(currentDomain, (updatedSites) => {
          renderContent(updatedSites);
          updateButtonState(updatedSites, currentDomain);
        });
      });
    });
  });
});
