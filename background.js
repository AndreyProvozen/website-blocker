import handleOnActivated from "./src/scripts/background/handleOnActivated.js";
import handleOnAlarm from "./src/scripts/background/handleOnAlarm.js";
import handleOnInstall from "./src/scripts/background/handleOnInstall.js";
import handleOnMessage from "./src/scripts/background/handleOnMessage.js";
import handleOnUpdated from "./src/scripts/background/handleOnUpdated.js";

chrome.tabs.onActivated.addListener(handleOnActivated);
chrome.runtime.onMessage.addListener(handleOnMessage);
chrome.tabs.onUpdated.addListener(handleOnUpdated);
chrome.alarms.onAlarm.addListener(handleOnAlarm);
chrome.runtime.onInstalled.addListener(handleOnInstall);
