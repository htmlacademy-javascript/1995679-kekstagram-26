// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomPositiveInteger = (min, max) => {
  if (max < min) {
    //Меняем значения местами...
    const swap = min;
    min = max;
    max = swap;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('random text', 140);

const messages = [
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

const names = [
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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// const getRandomSentences = () => {
//   return `${getRandomArrayElement(messages)} ${getRandomArrayElement(
//     messages
//   )}`;
// };

const shuffle = (elements) => {
  const shuffledElements = [];
  const elementsToShuffle = [...elements];
  while (elementsToShuffle.length) {
    const randomElement = Math.floor(Math.random() * elementsToShuffle.length);
    const elementToTake = elementsToShuffle.splice(randomElement, 1);
    shuffledElements.push(elementToTake[0]);
  }
  return shuffledElements;
};

const getRandomSentences = (sentences, minAmountOfSentences, maxAmountOfSentences) => {
  const messagesToChoseFrom = shuffle(sentences);
  messagesToChoseFrom.splice(getRandomPositiveInteger(minAmountOfSentences, maxAmountOfSentences));
  const result = messagesToChoseFrom.join(' ');
  return result;
};

const minLikes = 15;
const maxLikes = 200;

const minAvatarNumber = 1;
const maxAvatarNumber = 6;

const minAmountOfMessages = 1;
const maxAmountOfMessages = 2;

const generateRandomComment = (commentId) => {
  const comment = {
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(
      minAvatarNumber,
      maxAvatarNumber
    )}.svg`,
    message: getRandomSentences(messages, minAmountOfMessages, maxAmountOfMessages),
    name: getRandomArrayElement(names),
  };
  return comment;
};

const getComments = (amountOfComments) => {
  const comments = [];
  for (let i = 1; i <= amountOfComments; i++) {
    comments.push(generateRandomComment(i));
  }
  return comments;
};

const getPhotoData = (photoId, amountOfComments) => {
  const photo = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Фотография ${photoId}`,
    likes: getRandomPositiveInteger(minLikes, maxLikes),
    comments: getComments(amountOfComments),
  };

  return photo;
};

const getPhotos = (amountOfPhotos, amountOfComments) => {
  const photos = [];

  for (let i = 1; i <= amountOfPhotos; i++) {
    photos.push(getPhotoData(i, amountOfComments));
  }
  return photos;
};

getPhotos(25, 3);
