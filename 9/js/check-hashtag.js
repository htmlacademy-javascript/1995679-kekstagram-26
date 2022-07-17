const HASGTAG_TEMPLATE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const checkHashtagValidity = (hashtag) => HASGTAG_TEMPLATE.test(hashtag);

const checkDuplicates = (elements) => new Set(elements).size === elements.length;

const checkHashtagField = (elements, maxAmount) => {
  elements = elements.toLowerCase();
  const hashtags = elements.split(' ');
  const everyHashtagIsValid = hashtags.every(checkHashtagValidity);
  const noDuplicates = checkDuplicates(hashtags);
  const notExceedsMaxAmount = hashtags.length <= maxAmount;
  return (everyHashtagIsValid && noDuplicates && notExceedsMaxAmount);
};

export { checkHashtagField };
