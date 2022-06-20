import {shuffle, getRandomPositiveInteger, getRandomArrayElement} from './util.js';

const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const MIN_AMOUNT_OF_MESSAGES = 1;
const MAX_AMOUNT_OF_MESSAGES = 2;

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

const getRandomSentences = (sentences, minAmountOfSentences, maxAmountOfSentences) => {
  shuffle(sentences);
  const amountOfSentences = getRandomPositiveInteger(minAmountOfSentences, maxAmountOfSentences);
  const result = [...sentences].splice(0, amountOfSentences);
  return result.join(' ');
};

const generateRandomComment = (commentId) => {
  const comment = {
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(
      MIN_AVATAR_NUMBER,
      MAX_AVATAR_NUMBER
    )}.svg`,
    message: getRandomSentences(messages, MIN_AMOUNT_OF_MESSAGES, MAX_AMOUNT_OF_MESSAGES),
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

export {getComments};
