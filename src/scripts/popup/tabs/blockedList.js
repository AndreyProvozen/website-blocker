import {
  getBlockedSites,
  toggleBlockedSite,
} from "../../utils/storageUtils.js";
import { updateListRelatedState } from "../../utils/updateBlockedList.js";

const DEFAULT_TIME = 25 * 60 * 1000; // 25 minute;
const DEFAULT_IS_WHOLE_DOMAIN = false;

document.addEventListener("DOMContentLoaded", async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab) return;

  const blockedSites = await getBlockedSites();
  updateListRelatedState(blockedSites);

  document
    .querySelector("#block-site-button")
    .addEventListener("click", () =>
      toggleBlockedSite(activeTab.url, DEFAULT_TIME, DEFAULT_IS_WHOLE_DOMAIN)
    );
});
