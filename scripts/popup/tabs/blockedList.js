import {
  getBlockedSites,
  toggleBlockedSite,
} from "../../utils/storageUtils.js";

document.addEventListener("DOMContentLoaded", () => {
  const blockedListTabElement = document.querySelector("#blocked-list-tab");
  const blockSiteButtonElement = document.querySelector("#block-site-button");

  const renderBlockedList = (blockedSites) => {
    blockedListTabElement.innerHTML = "";

    if (blockedSites.length === 0) {
      const emptyListImage = document.createElement("img");
      emptyListImage.className = "blocked-list__empty-list-image";
      emptyListImage.alt = "Empty list image";
      emptyListImage.src = chrome.runtime.getURL(
        "../../../images/empty-list-icon.png"
      );

      const emptyListTitle = document.createElement("p");
      emptyListTitle.textContent = "Your blocked list is empty";
      emptyListTitle.className = "blocked-list__empty-list-title";

      const emptyListSubTitle = document.createElement("p");
      emptyListSubTitle.textContent =
        "Start adding websites to your blocked list and take control of your focus.";
      emptyListSubTitle.className = "blocked-list__empty-list-subtitle";

      const emptyListButton = document.createElement("button");
      emptyListButton.textContent = "Add Websites";
      emptyListButton.className =
        "secondary-button blocked-list__empty-list-button";

      const emptyListContainer = document.createElement("div");
      emptyListContainer.className = "blocked-list__empty-list-container";

      emptyListContainer.appendChild(emptyListImage);
      emptyListContainer.appendChild(emptyListTitle);
      emptyListContainer.appendChild(emptyListSubTitle);
      emptyListContainer.appendChild(emptyListButton);

      blockedListTabElement.appendChild(emptyListContainer);
      return;
    }

    const title = document.createElement("p");
    title.textContent = "Blocked List";
    title.className = "current-website__info-label";

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

    blockedListTabElement.appendChild(title);
    blockedListTabElement.appendChild(list);
  };

  const updateButtonState = (blockedSites, currentDomain) => {
    if (blockedSites.includes(currentDomain)) {
      blockSiteButtonElement.textContent = "Remove from blocked list";
    } else {
      blockSiteButtonElement.textContent = "Add to blocked list";
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
