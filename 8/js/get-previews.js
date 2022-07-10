import { getPhotos } from './get-photos.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesPreviewsElement = document.querySelector('.pictures');

const getPreviews = (amountOfPhotos, amountOfComments) => {
  const photos = getPhotos(amountOfPhotos, amountOfComments);

  const photosFragment =  document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const url = pictureElement.querySelector('img');
    const likes = pictureElement.querySelector('.picture__likes');
    const comments = pictureElement.querySelector('.picture__comments');
    url.src = photo.url;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;
    photosFragment.appendChild(pictureElement);
  });

  picturesPreviewsElement.appendChild(photosFragment);
};

export { getPreviews };
