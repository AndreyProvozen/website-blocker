import { getBlockedSites, setBlockedSites } from "../utils/storageUtils.js";

const handleOnFocusChanged = async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    const blockedSites = await getBlockedSites();

    const updatedSites = blockedSites.map((site) => {
      if (site.sessionStartTime) {
        const timeSpent = Date.now() - site.sessionStartTime;

        return {
          ...site,
          timeLeft: (site.timeLeft || 0) - timeSpent,
          sessionStartTime: undefined,
        };
      }
      return site;
    });

    setBlockedSites(updatedSites);
  }
};

export default handleOnFocusChanged;
