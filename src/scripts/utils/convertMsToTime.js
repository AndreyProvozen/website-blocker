const formatMsToTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const mappedTime = [hours, minutes, seconds].map((value) =>
    String(value).padStart(2, "0")
  );

  return mappedTime.join(":");
};

export default formatMsToTime;
