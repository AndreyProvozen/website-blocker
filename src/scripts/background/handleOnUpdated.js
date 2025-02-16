import isRestrictedUrl from "../utils/isRestrictedUrl.js";

const handleOnUpdated = (tabId, { status }, { url }) => {
  if (status === "complete" && url && !isRestrictedUrl(url)) {
    const expirationTime = Date.now() + 3000;
    chrome.alarms.create(`tab-${tabId}`, { when: expirationTime });
  }
};

export default handleOnUpdated;
