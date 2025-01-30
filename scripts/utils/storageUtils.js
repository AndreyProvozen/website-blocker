export const STORAGE_KEY = "blockedSites";

export const getBlockedSites = (callback) => {
  chrome.storage.local.get(STORAGE_KEY, ({ blockedSites = [] }) => {
    callback(blockedSites);
  });
};

const setBlockedSites = (blockedSites, callback) => {
  chrome.storage.local.set({ [STORAGE_KEY]: blockedSites }, callback);
};

export const toggleBlockedSite = (link, time, isWholeDomain, callback) => {
  getBlockedSites((blockedSites) => {
    const existingIndex = blockedSites.findIndex((site) => site.link === link);

    if (existingIndex > -1) {
      blockedSites.splice(existingIndex, 1);
    } else {
      blockedSites.push({ link, time, isWholeDomain });
    }

    setBlockedSites(blockedSites, () => callback(blockedSites));
  });
};

export const removeBlockedSite = (link, callback) => {
  getBlockedSites((blockedSites) => {
    const updatedSites = blockedSites.filter((site) => site.link !== link);

    setBlockedSites(updatedSites, () => callback(updatedSites));
  });
};

export const addBlockedSite = (link, time, isWholeDomain, callback) => {
  getBlockedSites((blockedSites) => {
    blockedSites.push({ link, time, isWholeDomain });

    setBlockedSites(blockedSites, () => callback(blockedSites));
  });
};
