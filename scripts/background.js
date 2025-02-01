import { renderExpirationScreen } from "./utils/renderExpirationScreen.js";

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

    if (tab?.url && !isRestrictedUrl(tab.url)) {
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
