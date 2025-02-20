import formatMsToTime from "../../utils/convertMsToTime.js";
import { getBlockedSites } from "../../utils/storageUtils.js";

const updateTabInfo = async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab) return;

  const { favIconUrl, url } = activeTab;
  const { hostname } = new URL(url);

  let blockedSites = await getBlockedSites();

  blockedSites = blockedSites.map((site) => {
    if (
      site.link === url ||
      (site.isWholeDomain && hostname.endsWith(new URL(site.link).hostname))
    ) {
      return { ...site, timeLeft: Math.max((site.timeLeft || 0) - 1000, 0) };
    }
    return site;
  });

  const blockedSite = blockedSites.find(
    (site) =>
      site.link === url ||
      (site.isWholeDomain && hostname.endsWith(new URL(site.link).hostname))
  );

  const websiteIconElement = document.querySelector("#website-icon");
  const domainElement = document.querySelector("#domain");
  const timeRemainingElement = document.querySelector("#time-remaining");
  const fullLinkElement = document.querySelector("#full-link");
  const addToListNavButton = document.querySelector("#add-to-list-nav");
  const linkInput = document.querySelector("#new-blocked-link");
  const addWithConfigurationButton = document.querySelector(
    "#add-with-configuration"
  );

  websiteIconElement.src = favIconUrl;
  websiteIconElement.addEventListener("error", () => {
    websiteIconElement.style.display = "none";
  });

  domainElement.textContent = hostname;
  fullLinkElement.textContent = fullLinkElement.title = url;

  timeRemainingElement.textContent = blockedSite
    ? formatMsToTime(blockedSite.timeLeft)
    : "00:25:00";

  addWithConfigurationButton.addEventListener("click", () => {
    linkInput.value = url;
    addToListNavButton.click();
  });
};

document.addEventListener("DOMContentLoaded", updateTabInfo);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.blockedSites) {
    updateTabInfo();
  }

  setInterval(updateTabInfo, 1000);
});
