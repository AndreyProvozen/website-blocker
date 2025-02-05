const renderEmptyList = (container, chrome) => {
  container.innerHTML = "";

  const emptyListImage = document.createElement("img");
  emptyListImage.className = "blocked-list__empty-list-image";
  emptyListImage.alt = "Empty list image";
  emptyListImage.src = chrome.runtime.getURL(
    "../../images/empty-list-icon.png"
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
  emptyListButton.addEventListener("click", () => {
    const addToListNavButton = document.querySelector("#add-to-list-nav");
    addToListNavButton.click();
  });

  const emptyListContainer = document.createElement("div");
  emptyListContainer.className = "blocked-list__empty-list-container";

  emptyListContainer.appendChild(emptyListImage);
  emptyListContainer.appendChild(emptyListTitle);
  emptyListContainer.appendChild(emptyListSubTitle);
  emptyListContainer.appendChild(emptyListButton);

  container.appendChild(emptyListContainer);
};

export default renderEmptyList;
