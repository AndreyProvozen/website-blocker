import {
  getBlockedSites,
  toggleBlockedSite,
} from "../../utils/storageUtils.js";
import { updateListRelatedState } from "../../utils/updateBlockedList.js";

const DEFAULT_TIME = "00:25";
const DEFAULT_IS_WHOLE_DOMAIN = false;

document.addEventListener("DOMContentLoaded", async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab) return;

  const currentDomain = new URL(activeTab.url).hostname;

  const blockedSites = await getBlockedSites();
  updateListRelatedState(blockedSites);

  document
    .querySelector("#block-site-button")
    .addEventListener("click", () =>
      toggleBlockedSite(currentDomain, DEFAULT_TIME, DEFAULT_IS_WHOLE_DOMAIN)
    );
});
