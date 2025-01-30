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
    const isBlocked = blockedSites.some((site) => site.link === currentDomain);

    if (isBlocked) {
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
        const toggleBlockedSiteCallback = (updatedSites) => {
          renderContent(updatedSites);
          updateButtonState(updatedSites, currentDomain);
        };

        toggleBlockedSite(
          currentDomain,
          "00:25",
          false,
          toggleBlockedSiteCallback
        );
      });
    });
  });
});
