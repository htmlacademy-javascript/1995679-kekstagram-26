// Использовал "developer.mozilla.org" для основной формулы

const getRandomNumber = function (min, max) {
  if (min < 0 || max < 0 || min === max) {
    //Проверяем чтобы числа были разные и больше или равные 0
    return;
  }

  if (max < min) {
    //Меняем значения местами...
    const swap = min;
    min = max;
    max = swap;
  }

  if (min % 1 !== 0 || max % 1 !== 0) {
    if (max - min < 1) {
      //Проверяем вдруг разница между числами меньше 1, соответственно нет целых чисел в промежутке
      return;
    }
    //Округляем числа если они флоаты
    min = Math.ceil(min);
    max = Math.floor(max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomNumber(2.6, 0.9);

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('Test comment', 9);
