import validateUrl from "../utils/validateUrl.js";
import { getBlockedSites, setBlockedSites } from "../utils/storageUtils.js";

let lastActiveTabUrl = null;
let intervalId = null;

const updateTimeLeft = async (activeTabUrl, tabId) => {
  let blockedSites = await getBlockedSites();
  const { hostname } = new URL(activeTabUrl);

  blockedSites = blockedSites.map((site) => {
    const { hostname: iterableSiteHostname } = new URL(site.link);

    if (site.link === lastActiveTabUrl || iterableSiteHostname === hostname) {
      const timeLeft = Math.max((site.timeLeft || 0) - 1000, 0);

      if (timeLeft === 0) {
        chrome.alarms.create(`tab-${tabId}`, { when: Date.now() });
      }

      return { ...site, timeLeft };
    }

    return site;
  });

  setBlockedSites(blockedSites);
};

const startTimeLeftInterval = async (activeTabUrl, tabId) => {
  let blockedSites = await getBlockedSites();
  const { hostname } = new URL(activeTabUrl);

  const isBlocked = blockedSites.some((site) => {
    const { hostname: iterableSiteHostname } = new URL(site.link);

    return site.link === activeTabUrl || iterableSiteHostname === hostname;
  });

  if (isBlocked && !intervalId) {
    intervalId = setInterval(() => updateTimeLeft(activeTabUrl, tabId), 1000);
  }
};

const stopTimeLeftInterval = () => {
  if (!intervalId) return;

  clearInterval(intervalId);
  intervalId = null;
};

const handleOnActivated = async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  const tabUrl = tab?.url;

  if (!validateUrl(tabUrl)) {
    return stopTimeLeftInterval();
  }

  if (lastActiveTabUrl && lastActiveTabUrl !== tabUrl) {
    stopTimeLeftInterval();
  }

  lastActiveTabUrl = tabUrl;
  startTimeLeftInterval(tabUrl, tabId);
};

export default handleOnActivated;
