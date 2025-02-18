import validateUrl from "../utils/validateUrl.js";

const handleOnUpdated = (tabId, { status }, { url }) => {
  if (status === "complete" && url && validateUrl(url)) {
    const expirationTime = Date.now() + 3000;
    chrome.alarms.create(`tab-${tabId}`, { when: expirationTime });
  }
};

export default handleOnUpdated;
