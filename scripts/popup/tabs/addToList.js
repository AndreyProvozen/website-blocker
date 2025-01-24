import { toggleBlockedSite } from "../../utils/storageUtils.js";

document.querySelector("#add-to-list-button").addEventListener("click", () => {
  const linkInput = document.querySelector("#new-blocked-link");
  const timeInput = document.querySelector("#block-time");
  const isWholeSiteCheckbox =
    document.querySelector("#block-whole-site").checked;

  const link = linkInput.value.trim();
  const time = timeInput.value.trim();
  const isWholeDomain = isWholeSiteCheckbox.checked;

  linkInput.classList.remove("error");
  timeInput.classList.remove("error");

  if (link && time) {
    toggleBlockedSite(link, time, isWholeDomain, () => {
      linkInput.value = "";
      timeInput.value = "";
      isWholeSiteCheckbox.checked = false;
    });
  } else {
    if (!link) {
      linkInput.classList.add("error");
    }

    if (!time) {
      timeInput.classList.add("error");
    }
  }
});
