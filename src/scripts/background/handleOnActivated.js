import isRestrictedUrl from "../utils/isRestrictedUrl.js";
import { getBlockedSites, setBlockedSites } from "../utils/storageUtils.js";

const handleOnActivated = async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  const tabUrl = tab?.url;

  if (!tabUrl || isRestrictedUrl(tabUrl)) return;

  const blockedSites = await getBlockedSites(tabUrl);

  const updatedSites = blockedSites.map((site) => {
    const { link, isWholeDomain } = site;

    if (isWholeDomain) {
      try {
        const blockedDomain = new URL(link).hostname;
        const currentDomain = new URL(tabUrl).hostname;

        if (currentDomain.endsWith(blockedDomain)) {
          return { ...site, sessionStartTime: Date.now() };
        }
      } catch (e) {
        return site;
      }
    }

    return tabUrl === link ? { ...site, sessionStartTime: Date.now() } : site;
  });

  setBlockedSites(updatedSites);
};

export default handleOnActivated;
