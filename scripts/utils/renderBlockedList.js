import { removeBlockedSite } from "./storageUtils.js";

export const renderBlockedList = (container, blockedSites, chrome) => {
  container.innerHTML = "";

  const title = document.createElement("p");
  title.textContent = "Blocked List";
  title.className = "current-website__info-label";

  const list = document.createElement("ul");
  list.className = "blocked-list__list";

  blockedSites.forEach(({ link, isWholeDomain }) => {
    const linkType = isWholeDomain ? "house" : "link";

    const listItem = document.createElement("li");
    listItem.className = "blocked-list__list-item";

    const linkWrapper = document.createElement("div");
    linkWrapper.className = "blocked-list__section-wrapper";

    const linkTypeImage = document.createElement("img");
    linkTypeImage.src = chrome.runtime.getURL(
      `../../../assets/${linkType}.svg`
    );
    linkTypeImage.alt = "link type icon";

    const blockedLink = document.createElement("p");
    blockedLink.className = "blocked-list__link";
    blockedLink.textContent = link;

    linkWrapper.appendChild(linkTypeImage);
    linkWrapper.appendChild(blockedLink);

    const actionWrapper = document.createElement("div");
    actionWrapper.className = "blocked-list__section-wrapper";

    const removeButton = document.createElement("button");
    removeButton.addEventListener("click", () => removeBlockedSite(link));
    removeButton.className = "danger-button blocked-list__button-base";

    const removeIcon = document.createElement("img");
    removeIcon.src = chrome.runtime.getURL("../../../assets/trash.svg");
    removeIcon.alt = "Remove";

    removeButton.appendChild(removeIcon);
    actionWrapper.appendChild(removeButton);

    listItem.appendChild(linkWrapper);
    listItem.appendChild(actionWrapper);

    list.appendChild(listItem);
  });

  container.appendChild(title);
  container.appendChild(list);
};
