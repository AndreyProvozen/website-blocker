import handleOnAlarm from "./src/scripts/background/handleOnAlarm.js";
import handleOnMessage from "./src/scripts/background/handleOnMessage.js";
import handleOnUpdated from "./src/scripts/background/handleOnUpdated.js";

chrome.runtime.onMessage.addListener(handleOnMessage);
chrome.tabs.onUpdated.addListener(handleOnUpdated);
chrome.alarms.onAlarm.addListener(handleOnAlarm);
