// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('random text', 140);

const messageList = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const namesList = [
  'Бакстер Стокман',
  'Бибоп и Рокстеди',
  'Донателло',
  'Караи',
  'Кейси Джонс',
  'Крэнг',
  'Леонардо',
  'Микеланджело',
  'Миямото Усаги',
  'Эйприл ОНил',
  'Рафаэль',
  'Сплинтер',
  'Хамато Ёси',
  'Шреддер',
];

function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getRandomMessage() {
  return (
    `${getRandomArrayElement(messageList)} ${getRandomArrayElement(messageList)}`
  );
}

function getPhotoData(i) {
  const photo = {
    id: i,
    url: `photos/${i}.jpg`,
    description: `Фотография ${i}`,
    likes: getRandomPositiveInteger(15, 200),
    comments: [
      {
        id: i + 1000,
        avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
        message: getRandomMessage(),
        name: getRandomArrayElement(namesList),
      },
      {
        id: i + 2000,
        avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
        message: getRandomMessage(),
        name: getRandomArrayElement(namesList),
      },
    ],
  };

  return photo;
}

function getPhotoList() {
  const photosList = [];

  for (let i = 1; i <= 25; i++) {
    photosList.push(getPhotoData(i));
  }
  return photosList;
}

const finalList = getPhotoList();
