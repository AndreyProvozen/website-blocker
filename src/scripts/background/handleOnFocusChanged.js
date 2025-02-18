import { getBlockedSites, setBlockedSites } from "../utils/storageUtils.js";

const handleOnFocusChanged = async (windowId) => {
  const blockedSites = await getBlockedSites();
  let updatedSites = blockedSites;

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    updatedSites = updatedSites.map((site) => {
      if (site.sessionStartTime) {
        const timeSpent = Date.now() - site.sessionStartTime;
        const newTimeLeft = Math.max((site.timeLeft || 0) - timeSpent, 0);

        return {
          ...site,
          timeLeft: newTimeLeft,
          sessionStartTime: undefined,
        };
      }

      return site;
    });
  } else {
    updatedSites = updatedSites.map((site) => {
      if (!site.sessionStartTime && site.timeLeft > 0) {
        return { ...site, sessionStartTime: Date.now() };
      }

      return site;
    });
  }

  setBlockedSites(updatedSites);
};

export default handleOnFocusChanged;
