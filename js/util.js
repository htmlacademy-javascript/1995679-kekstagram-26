// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomPositiveInteger = (min, max) => {
  if (max < min) {
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const shuffle = (elements) => {
  for (let i = 0; i < elements.length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    const swap = elements[randomIndex];
    elements[randomIndex] = elements[i];
    elements[i] = swap;
  }
  return elements;
};

export {checkStringLength, getRandomArrayElement, shuffle, getRandomPositiveInteger};
