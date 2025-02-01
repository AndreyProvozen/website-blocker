export const renderExpirationScreen = () => {
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
      z-index: 999999;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(15px);
      font-family: 'Arial', sans-serif;
      transition: all 0.3s ease-in-out;
    }
  
    #${WRAPPER_ID} .exp-logo {
      width: 120px;
      height: 120px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      margin-bottom: 20px;
    }
  
    #${WRAPPER_ID} .exp-message {
      font-size: 20px;
      font-weight: bold;
      color: #fff; 
      text-align: center;
      margin: 0;
    }
  
    #${WRAPPER_ID} .exp-content {
      padding: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      flex-direction: column;
      background-color: #021d44;
      gap: 20px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      width: 100%;
      transition: transform 0.3s ease-in-out;
    }
  
    #${WRAPPER_ID} .exp-close-button {
      padding: 12px 30px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: #ff4d4d;
      color: #fff;
      font-weight: bold;
      transition: background-color 0.3s ease-in-out;
    }
  
    #${WRAPPER_ID} .exp-close-button:hover {
      background-color: #e63e3e;
    }
  
    #${WRAPPER_ID} .exp-close-button:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
    }
    `;

  const wrapper = document.createElement("div");
  wrapper.id = WRAPPER_ID;

  const content = document.createElement("div");
  content.className = "exp-content";

  const image = document.createElement("img");
  image.src = chrome.runtime.getURL("../images/icon-128.png");
  image.className = "exp-logo";
  image.alt = "Extension logo icon";

  const message = document.createElement("p");
  message.textContent = "Time's up! You've reached your limit for today.";
  message.className = "exp-message";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close window";
  closeButton.className = "exp-close-button";

  closeButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "closeCurrentTab" });
  });

  content.appendChild(image);
  content.appendChild(message);
  content.appendChild(closeButton);

  wrapper.appendChild(content);

  document.head.appendChild(style);
  document.body.appendChild(wrapper);
  document.body.style.overflow = "hidden";
};
