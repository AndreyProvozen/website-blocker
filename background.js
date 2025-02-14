import renderExpirationScreen from "./src/scripts/renderers/renderExpirationScreen.js";
import { getBlockedSites } from "./src/scripts/utils/storageUtils.js";

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "closeCurrentTab" && sender.tab?.id) {
    chrome.tabs.remove(sender.tab.id);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    !isRestrictedUrl(tab.url)
  ) {
    const expirationTime = Date.now() + 3000;
    chrome.alarms.create(`tab-${tabId}`, { when: expirationTime });
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
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
          console.error("Invalid URL in blocked list:", link);
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
    console.error(error);
  }
});

const URL_REGEX = /^chrome:|^about:|^edge:/i;
const isRestrictedUrl = (url) => URL_REGEX.test(url);
