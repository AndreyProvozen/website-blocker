import convertTimeToMs from "../../utils/convertTimeToMs.js";
import validateUrl from "../../utils/validateUrl.js";
import { addBlockedSite, getBlockedSites } from "../../utils/storageUtils.js";

const MIN_TIME = 1 * 60 * 1000; // 1 minute

const linkInput = document.querySelector("#new-blocked-link");
const timeInput = document.querySelector("#block-time");
const isWholeSiteCheckbox = document.querySelector("#block-whole-site");
const addButton = document.querySelector("#add-to-list-button");

const linkError = document.createElement("p");
linkError.classList.add("error-message");
linkInput.parentNode.appendChild(linkError);

const timeError = document.createElement("p");
timeError.classList.add("error-message");
timeInput.parentNode.appendChild(timeError);

linkInput.addEventListener("input", () => {
  linkInput.classList.remove("error");
  linkError.textContent = "";
});

timeInput.addEventListener("input", () => {
  timeInput.classList.remove("error");
  timeError.textContent = "";
});

addButton.addEventListener("click", async () => {
  const link = linkInput.value.trim();
  const time = timeInput.value.trim();
  const isWholeDomain = isWholeSiteCheckbox.checked;

  let isValid = true;

  if (!validateUrl(link)) {
    linkInput.classList.add("error");
    linkError.textContent = "Please enter a valid website link";
    isValid = false;
  }

  const timeInMs = convertTimeToMs(time);

  if (timeInMs < MIN_TIME) {
    timeInput.classList.add("error");
    timeError.textContent = "Time must be at least 1 minute";
    isValid = false;
  }

  if (!isValid) return;

  const blockedSites = await getBlockedSites();
  const linkExists = blockedSites.some((site) => site.link === link);

  if (linkExists) {
    linkInput.classList.add("error");
    linkError.textContent = "This website is already blocked";
    return;
  }

  await addBlockedSite(link, timeInMs, isWholeDomain);

  linkInput.value = "";
  timeInput.value = "";
  isWholeSiteCheckbox.checked = false;
});
