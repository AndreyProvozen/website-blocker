document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.length) return;

    const [{ favIconUrl, url }] = tabs;

    const websiteIconElement = document.querySelector("#website-icon");
    const domainElement = document.querySelector("#domain");
    const fullLinkElement = document.querySelector("#full-link");

    websiteIconElement.src = favIconUrl;
    websiteIconElement.addEventListener("error", () => {
      websiteIconElement.style.display = "none";
    });

    const currentTabUrl = new URL(url);
    const currentDomain = currentTabUrl.hostname;

    domainElement.textContent = currentDomain;

    fullLinkElement.textContent = url;
    fullLinkElement.title = url;
  });
});

const timeRemainingElement = document.querySelector("#time-remaining");
timeRemainingElement.textContent = "00:10:00";
