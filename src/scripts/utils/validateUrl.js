const RESTRICTED_PROTOCOLS = new Set(["chrome:", "about:", "edge:"]);

const validateUrl = (url) => {
  try {
    const { protocol } = new URL(url);
    return !RESTRICTED_PROTOCOLS.has(protocol);
  } catch {
    return false;
  }
};

export default validateUrl;
