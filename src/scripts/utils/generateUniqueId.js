const generateUniqueId = () =>
  `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export default generateUniqueId;
