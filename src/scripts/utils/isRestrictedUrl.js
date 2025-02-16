const URL_REGEX = /^chrome:|^about:|^edge:/i;

const isRestrictedUrl = (url) => URL_REGEX.test(url);

export default isRestrictedUrl;
