document.addEventListener("DOMContentLoaded", async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab) return;

  const { favIconUrl, url } = activeTab;
  const { hostname } = new URL(url);

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

  timeRemainingElement.textContent = "00:10:00";

  addWithConfigurationButton.addEventListener("click", () => {
    linkInput.value = url;
    addToListNavButton.click();
  });
});
