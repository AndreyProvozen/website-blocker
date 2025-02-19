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

    if (blockedSite && blockedSite.timeLeft > 0) {
      const expirationTime = Date.now() + blockedSite.timeLeft;

      chrome.alarms.create(`tab-${tabId}`, { when: expirationTime });
    }
  }
};

export default handleOnUpdated;
