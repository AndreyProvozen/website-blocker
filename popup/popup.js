document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.length) return;

    const [tab] = tabs;

    const domainElement = document.querySelector("#domain");
    const fullLinkElement = document.querySelector("#full-link");
    const websiteIconElement = document.querySelector("#website-icon");

    websiteIconElement.src = tab.favIconUrl;
    websiteIconElement.addEventListener("error", () => {
      websiteIconElement.style.display = "none";
    });

    const url = new URL(tab.url);
    domainElement.textContent = url.hostname;

    fullLinkElement.textContent = tab.url;
  });

  const closeButton = document.querySelector("#cross");
  closeButton.addEventListener("click", () => window.close());

  const timeRemainingElement = document.querySelector("#time-remaining");
  timeRemainingElement.textContent = "00:10:00";
});
