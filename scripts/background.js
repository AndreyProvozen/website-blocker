import { renderExpirationScreen } from "./utils/renderExpirationScreen.js";

const startTimerForTab = (tabId) => {
  const expirationTime = Date.now() + 300000;
  chrome.alarms.create(`tab-${tabId}`, { when: expirationTime });
};

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
    startTimerForTab(tabId);
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  const tabId = parseInt(alarm.name.split("-")[1]);

  if (!isNaN(tabId)) {
    chrome.tabs.get(tabId, (tab) => {
      if (tab?.url && !isRestrictedUrl(tab.url)) {
        chrome.scripting.executeScript({
          target: { tabId },
          func: renderExpirationScreen,
        });
      }
    });
  }
});

const isRestrictedUrl = (url) =>
  url.startsWith("chrome://") ||
  url.startsWith("about:") ||
  url.startsWith("edge://");
