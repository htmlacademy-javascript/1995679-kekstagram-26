// Использовал "developer.mozilla.org" для основной формулы

const getRandomNumber = function (min, max) {
  if (max < min) {
    //Меняем значения местами...
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomNumber(10, 2);


const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('Test comment', 9);
