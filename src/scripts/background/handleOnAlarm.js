import { getBlockedSites } from "../utils/storageUtils.js";
import isRestrictedUrl from "../utils/isRestrictedUrl.js";
import renderExpirationScreen from "../renderers/renderExpirationScreen.js";

const handleOnAlarm = async (alarm) => {
  const tabId = parseInt(alarm.name.replace("tab-", ""), 10);

  if (isNaN(tabId)) return;

  try {
    const tab = await chrome.tabs.get(tabId);
    const tabUrl = tab?.url;

    if (!tabUrl || isRestrictedUrl(tabUrl)) return;

    const blockedSites = await getBlockedSites();

    const isBlocked = blockedSites.some(({ link, isWholeDomain }) => {
      if (isWholeDomain) {
        try {
          const blockedDomain = new URL(link).hostname;
          const currentDomain = new URL(tabUrl).hostname;

          return currentDomain.endsWith(blockedDomain);
        } catch (e) {
          return false;
        }
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
