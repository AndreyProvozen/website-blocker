export const STORAGE_KEY = "blockedSites";

export const getBlockedSites = (callback) => {
  chrome.storage.local.get(STORAGE_KEY, ({ blockedSites = [] }) => {
    callback(blockedSites);
  });
};

export const setBlockedSites = (blockedSites, callback) => {
  chrome.storage.local.set({ [STORAGE_KEY]: blockedSites }, callback);
};

export const toggleBlockedSite = (domain, callback) => {
  getBlockedSites((blockedSites) => {
    const updatedSites = blockedSites.includes(domain)
      ? blockedSites.filter((site) => site !== domain)
      : [...blockedSites, domain];
    setBlockedSites(updatedSites, () => callback(updatedSites));
  });
};
