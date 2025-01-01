document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.length) return;

    const [{ favIconUrl, url }] = tabs;

    const domainElement = document.querySelector("#domain");
    const fullLinkElement = document.querySelector("#full-link");
    const websiteIconElement = document.querySelector("#website-icon");

    websiteIconElement.src = favIconUrl;
    websiteIconElement.addEventListener("error", () => {
      websiteIconElement.style.display = "none";
    });

    const currentTabUrl = new URL(url);
    domainElement.textContent = currentTabUrl.hostname;

    fullLinkElement.textContent = url;
  });

  const closeButton = document.querySelector("#cross");
  closeButton.addEventListener("click", () => window.close());

  const timeRemainingElement = document.querySelector("#time-remaining");
  timeRemainingElement.textContent = "00:10:00";
});
