import { renderEmptyList } from "./renderEmptyList.js";
import { renderBlockedList } from "./renderBlockedList.js";

const blockSiteButtonElement = document.querySelector("#block-site-button");
const blockedListTabElement = document.querySelector("#blocked-list-tab");

const updateButtonState = (blockedSites) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    if (!tabs?.length) return;

    const [{ url }] = tabs;
    const currentDomain = new URL(url).hostname;

    const isBlocked = blockedSites.some((site) => site.link === currentDomain);

    if (isBlocked) {
      blockSiteButtonElement.textContent = "Remove from blocked list";
    } else {
      blockSiteButtonElement.textContent = "Add to blocked list";
    }
  });
};

const blockedListContent = (blockedSites) => {
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
