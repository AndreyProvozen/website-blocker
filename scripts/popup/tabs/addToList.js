import convertTimeToMs from "../../utils/convertTimeToMs.js";
import { addBlockedSite } from "../../utils/storageUtils.js";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const MIN_TIME = 1 * 60 * 1000; // 1 minute

const linkInput = document.querySelector("#new-blocked-link");
const timeInput = document.querySelector("#block-time");
const isWholeSiteCheckbox = document.querySelector("#block-whole-site");
const addButton = document.querySelector("#add-to-list-button");

linkInput.addEventListener("input", () => linkInput.classList.remove("error"));
timeInput.addEventListener("input", () => timeInput.classList.remove("error"));

addButton.addEventListener("click", async () => {
  const link = linkInput.value.trim();
  const time = timeInput.value.trim();
  const isWholeDomain = isWholeSiteCheckbox.checked;

  let isValid = true;

  if (!isValidUrl(link)) {
    linkInput.classList.add("error");
    isValid = false;
  }

  const timeInMs = convertTimeToMs(time);

  if (timeInMs < MIN_TIME) {
    timeInput.classList.add("error");
    isValid = false;
  }

  if (!isValid) return;

  await addBlockedSite(link, timeInMs, isWholeDomain);

  linkInput.value = "";
  timeInput.value = "";
  isWholeSiteCheckbox.checked = false;
});
