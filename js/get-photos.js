const MIN_LIKES = 15;
const MAX_LIKES = 200;

import {getRandomPositiveInteger} from './util.js';
import {getComments} from './get-comments.js';

const getPhotoData = (photoId, amountOfComments) => {
  const photo = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Фотография ${photoId}`,
    likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
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

export {getPhotos};
