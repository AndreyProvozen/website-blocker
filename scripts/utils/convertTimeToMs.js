const convertTimeToMs = (timeString) => {
  const [hours, minutes] = timeString.split(":");

  return (hours * 60 + minutes) * 60 * 1000;
};

export default convertTimeToMs;
