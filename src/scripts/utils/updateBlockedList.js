import renderEmptyList from "../renderers/renderEmptyList.js";
import renderBlockedList from "../renderers/renderBlockedList.js";

const updateButtonState = (blockedSites) => {
  const blockSiteButtonElement = document.querySelector("#block-site-button");

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (!tabs?.length) return;

    const [{ url }] = tabs;

    const isBlocked = blockedSites.some((site) => site.link === url);

    if (isBlocked) {
      blockSiteButtonElement.textContent = "Remove from blocked list";
    } else {
      blockSiteButtonElement.textContent = "Add to blocked list";
    }
  });
};

const blockedListContent = (blockedSites) => {
  const blockedListTabElement = document.querySelector("#blocked-list-tab");

  if (blockedSites.length === 0) {
    renderEmptyList(blockedListTabElement, chrome);
    return;
  }

  renderBlockedList(blockedListTabElement, blockedSites, chrome);
};

export const updateListRelatedState = (blockedSites) => {
  updateButtonState(blockedSites);
  blockedListContent(blockedSites);
};
