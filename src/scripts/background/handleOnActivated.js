import validateUrl from "../utils/validateUrl.js";
import { getBlockedSites, setBlockedSites } from "../utils/storageUtils.js";

const handleOnActivated = async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  const tabUrl = tab?.url;

  if (!validateUrl(tabUrl)) return;

  const blockedSites = await getBlockedSites(tabUrl);
  const { hostname } = new URL(tabUrl);

  const updatedSites = blockedSites.map((site) => {
    const { link, isWholeDomain } = site;

    if (isWholeDomain) {
      const blockedDomain = new URL(link).hostname;
      if (hostname.endsWith(blockedDomain)) {
        return { ...site, sessionStartTime: Date.now() };
      }
    }

    return tabUrl === link ? { ...site, sessionStartTime: Date.now() } : site;
  });

  setBlockedSites(updatedSites);
};

export default handleOnActivated;
