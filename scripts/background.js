const startTimerForTab = (tabId) => {
  // TODO
  const expirationTime = Date.now() + 300000;
  chrome.alarms.create(`tab-${tabId}`, { when: expirationTime });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    startTimerForTab(tabId);
  }
});

const renderExpirationScreen = () => {
  const existingMessage = document.querySelector("#expiration-wrapper");

  if (existingMessage) return;

  const WRAPPER_ID = "expiration-wrapper";

  const style = document.createElement("style");
  style.innerHTML = `
  #${WRAPPER_ID} {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff; /* --white */
    z-index: 999999;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    font-family: 'Arial', sans-serif;
    transition: all 0.3s ease-in-out;
  }

  #${WRAPPER_ID} .logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  #${WRAPPER_ID} .message {
    font-size: 20px; /* --font-size-xxlarge */
    font-weight: bold; 
    margin: 0;
    text-align: center;
  }

  #${WRAPPER_ID} .content {
    padding: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #021d44; /* --blue-dark */
    gap: 20px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;
    transition: transform 0.3s ease-in-out;
  }

  #${WRAPPER_ID} .close-button {
    padding: 12px 30px;
    font-size: 18px; /* --font-size-xlarge */
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #ff4d4d; /* --red */
    color: #fff; /* --white */
    font-weight: bold;
    transition: background-color 0.3s ease-in-out;
  }

  #${WRAPPER_ID} .close-button:hover {
    background-color: #e63e3e; /* --red-dark */
  }

  #${WRAPPER_ID} .close-button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  }
  `;

  const wrapper = document.createElement("div");
  wrapper.id = WRAPPER_ID;

  const content = document.createElement("div");
  content.className = "content";

  const image = document.createElement("img");
  image.src = chrome.runtime.getURL("../images/icon-128.png");
  image.className = "logo";
  image.alt = "Extension logo icon";

  const message = document.createElement("p");
  message.textContent = "Time's up! You've reached your limit for today.";
  message.className = "message";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close window";
  closeButton.className = "close-button";

  content.appendChild(image);
  content.appendChild(message);
  content.appendChild(closeButton);

  wrapper.appendChild(content);

  document.head.appendChild(style);
  document.body.appendChild(wrapper);
  document.body.style.overflow = "hidden";
};

chrome.alarms.onAlarm.addListener((alarm) => {
  const tabId = parseInt(alarm.name.split("-")[1]);
  if (!isNaN(tabId)) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: renderExpirationScreen,
    });
  }
});
