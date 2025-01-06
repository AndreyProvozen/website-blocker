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

  const blockSiteElement = document.querySelector("#block-site-button");
  blockSiteElement.textContent = "Add to blocked list";

  const footerNavButtons = document.querySelectorAll(".footer__nav-item");
  const sections = {
    "Blocked List": document.querySelector(".main__blocked-list"),
    "Current Site": document.querySelector(".main__current-website"),
  };

  sections["Current Site"].style.display = "block";

  footerNavButtons.forEach((navButton) => {
    navButton.addEventListener("click", () => {
      const tabName = navButton.querySelector("p").textContent;

      if (tabName === "Settings") {
        chrome.runtime.openOptionsPage();
        return;
      }

      footerNavButtons.forEach((btn) => btn.classList.remove("active"));
      navButton.classList.add("active");

      Object.entries(sections).forEach(([name, section]) => {
        section.style.display = name === tabName ? "block" : "none";
      });
    });
  });

  document.querySelector(".main__current-website").style.display = "block";
});
