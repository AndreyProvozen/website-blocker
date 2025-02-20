import validateUrl from "../utils/validateUrl.js";
import { getBlockedSites } from "../utils/storageUtils.js";

const handleOnUpdated = async (tabId, { status }, { url }) => {
  if (status === "complete" && url && validateUrl(url)) {
    const blockedSites = await getBlockedSites();
    const { hostname } = new URL(url);

    const blockedSite = blockedSites.find(({ link, isWholeDomain }) => {
      if (isWholeDomain) {
        const blockedDomain = new URL(link).hostname;
        return hostname.endsWith(blockedDomain);
      }

      return url === link;
    });

    if (blockedSite && blockedSite.timeLeft === 0) {
      chrome.alarms.create(`tab-${tabId}`, { when: Date.now() });
    }
  }
};

export default handleOnUpdated;
