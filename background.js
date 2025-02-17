import handleOnActivated from "./src/scripts/background/handleOnActivated.js";
import handleOnAlarm from "./src/scripts/background/handleOnAlarm.js";
import handleOnFocusChanged from "./src/scripts/background/handleOnFocusChanged.js";
import handleOnMessage from "./src/scripts/background/handleOnMessage.js";
import handleOnUpdated from "./src/scripts/background/handleOnUpdated.js";

chrome.windows.onFocusChanged.addListener(handleOnFocusChanged);
chrome.tabs.onActivated.addListener(handleOnActivated);
chrome.runtime.onMessage.addListener(handleOnMessage);
chrome.tabs.onUpdated.addListener(handleOnUpdated);
chrome.alarms.onAlarm.addListener(handleOnAlarm);
