const handleOnInstall = () => {
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);

  chrome.alarms.create("resetTimeLeftDaily", {
    when: nextMidnight.getTime(),
    periodInMinutes: 1440,
  });
};

export default handleOnInstall;
