const handleOnMessage = ({ action }, { tab }) => {
  if (action === "closeCurrentTab" && tab?.id) {
    chrome.tabs.remove(tab.id);
  }
};

export default handleOnMessage;
