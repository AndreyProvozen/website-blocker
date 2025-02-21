import { getBlockedSites, setBlockedSites } from "../utils/storageUtils.js";
import validateUrl from "../utils/validateUrl.js";
import renderExpirationScreen from "../renderers/renderExpirationScreen.js";

const handleOnAlarm = async (alarm) => {
  if (alarm.name === "resetTimeLeftDaily") {
    let blockedSites = await getBlockedSites();

    blockedSites = blockedSites.map((site) => ({
      ...site,
      timeLeft: site.dayTimeLimit,
    }));

    return setBlockedSites(blockedSites);
  }

  const tabId = parseInt(alarm.name.replace("tab-", ""), 10);

  if (isNaN(tabId)) return;

  try {
    const tab = await chrome.tabs.get(tabId);
    const tabUrl = tab?.url;

    if (!validateUrl(tabUrl)) return;

    const blockedSites = await getBlockedSites();

    const { hostname } = new URL(tabUrl);

    const isBlocked = blockedSites.some(({ link, isWholeDomain }) => {
      if (isWholeDomain) {
        const blockedDomain = new URL(link).hostname;
        return hostname.endsWith(blockedDomain);
      }

      return tabUrl === link;
    });

    if (isBlocked) {
      await chrome.scripting.executeScript({
        target: { tabId },
        func: renderExpirationScreen,
      });
    }
  } catch (error) {
    return false;
  }
};

export default handleOnAlarm;
