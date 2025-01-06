import {
  getBlockedSites,
  toggleBlockedSite,
} from "../../utils/storageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const blockedListElement = document.querySelector("#blocked-list");
  const blockSiteButtonElement = document.querySelector("#block-site-button");

  const renderBlockedList = (blockedSites) => {
    blockedListElement.innerHTML = "";

    if (blockedSites.length === 0) {
      blockedListElement.innerHTML = "<p>No websites are blocked yet.</p>";
      return;
    }

    const list = document.createElement("ul");

    blockedSites.forEach((site) => {
      const listItem = document.createElement("li");
      listItem.textContent = site;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () =>
        toggleBlockedSite(site, renderBlockedList)
      );

      listItem.appendChild(removeButton);
      list.appendChild(listItem);
    });

    blockedListElement.appendChild(list);
  };

  const updateButtonState = (blockedSites, currentDomain) => {
    if (blockedSites.includes(currentDomain)) {
      blockSiteButtonElement.textContent = "Remove from blocked list";
      blockSiteButtonElement.classList.add("blocked");
    } else {
      blockSiteButtonElement.textContent = "Add to blocked list";
      blockSiteButtonElement.classList.remove("blocked");
    }
  };

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs?.length) return;

    const [{ url }] = tabs;
    const currentDomain = new URL(url).hostname;

    getBlockedSites((blockedSites) => {
      renderBlockedList(blockedSites);
      updateButtonState(blockedSites, currentDomain);

      blockSiteButtonElement.addEventListener("click", () => {
        toggleBlockedSite(currentDomain, (updatedSites) => {
          renderBlockedList(updatedSites);
          updateButtonState(updatedSites, currentDomain);
        });
      });
    });
  });
});
