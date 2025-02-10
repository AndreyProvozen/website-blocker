import generateUniqueId from "./generateUniqueId.js";
import { updateListRelatedState } from "./updateBlockedList.js";

export const STORAGE_KEY = "blockedSites";

const setBlockedSites = (blockedSites) => {
  chrome.storage.local.set({ [STORAGE_KEY]: blockedSites });
};

export const getBlockedSites = async () => {
  const { blockedSites = [] } = await chrome.storage.local.get(STORAGE_KEY);
  return blockedSites;
};

export const toggleBlockedSite = async (link, dayTimeLimit, isWholeDomain) => {
  const blockedSites = await getBlockedSites();
  const existingIndex = blockedSites.findIndex((site) => site.link === link);

  if (existingIndex > -1) {
    blockedSites.splice(existingIndex, 1);
  } else {
    blockedSites.push({
      id: generateUniqueId(),
      timeLeft: dayTimeLimit,
      link,
      dayTimeLimit,
      isWholeDomain,
    });
  }

  setBlockedSites(blockedSites);
  updateListRelatedState(blockedSites);

  return blockedSites;
};

export const removeBlockedSite = async (link) => {
  const blockedSites = await getBlockedSites();
  const updatedSites = blockedSites.filter((site) => site.link !== link);

  setBlockedSites(updatedSites);
  updateListRelatedState(updatedSites);

  return updatedSites;
};

export const addBlockedSite = async (link, dayTimeLimit, isWholeDomain) => {
  const blockedSites = await getBlockedSites();

  blockedSites.push({
    id: generateUniqueId(),
    timeLeft: dayTimeLimit,
    link,
    dayTimeLimit,
    isWholeDomain,
  });

  setBlockedSites(blockedSites);
  updateListRelatedState(blockedSites);

  return blockedSites;
};
