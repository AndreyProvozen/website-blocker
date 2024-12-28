document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs?.length > 0) {
      const [tab] = tabs;

      const domainElement = document.querySelector("#domain");
      const fullLinkElement = document.querySelector("#full-link");

      try {
        const url = new URL(tab.url);

        domainElement.textContent = url.hostname;
        fullLinkElement.textContent = tab.url;
      } catch (error) {
        console.error("Error parsing URL:", error);

        domainElement.textContent = "Invalid URL";
        fullLinkElement.textContent = "N/A";
      }

      return;
    }

    console.error("No active tab found.");
  });
});
