import { shuffle } from './util.js';
import { openPreviewForm, showChosenPicture } from './show-big-picture.js';

const RANDOM_PHOTOS_AMOUNT = 10;
const RENDER_DELAY = 500;

let timeoutId;

const FILTERS = {
  'default': null,
  'random': applyRandomFilter,
  'discussed': applyDiscussedFilter,
};

const pictureTemplate = document.querySelector('#picture').content;
const picturesPreviewsElement = document.querySelector('.pictures');
const allFilterButtons = document.querySelectorAll('.img-filters__button');

const makePhoto = (photoData) => {
  const photo = {
    id: photoData.id,
    url: photoData.url,
    description: photoData.description,
    likes: photoData.likes,
    comments: photoData.comments,
  };

  return photo;
};

const getPhotos = (data) => {
  const photos = [];

  for (let i = 0; i < data.length; i++) {
    photos.push(makePhoto(data[i]));
  }
  return photos;
};

function applyRandomFilter (elements) {
  return shuffle(elements).slice(0, RANDOM_PHOTOS_AMOUNT);
}


function applyDiscussedFilter (elements) {

  const comparePopularity = (photoA, photoB) => {
    const commentsA = photoA.comments.length;
    const commentsB = photoB.comments.length;
    return commentsB - commentsA;
  };

  return elements.slice().sort(comparePopularity);
}

const renderPreviews = (data, filter) => {
  let photos = getPhotos(data);

  const photosFragment = document.createDocumentFragment();

  if (filter) {photos = filter(photos);}

  photos
    .forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      const url = pictureElement.querySelector('img');
      const likes = pictureElement.querySelector('.picture__likes');
      const comments = pictureElement.querySelector('.picture__comments');
      pictureElement.querySelector('.picture').dataset.id = photo.id;
      url.src = photo.url;
      likes.textContent = photo.likes;
      comments.textContent = photo.comments.length;
      photosFragment.appendChild(pictureElement);
    });

  picturesPreviewsElement.appendChild(photosFragment);
  const allPreviews = document.querySelectorAll('.picture');

  allPreviews.forEach((preview) => {
    preview.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPreviewForm();
      showChosenPicture(preview, data);
    });
  });

  const changeActiveFilterButton = (button) => {
    allFilterButtons.forEach((buttonElement) => {
      if (buttonElement.classList.contains('img-filters__button--active')) {
        buttonElement.classList.remove('img-filters__button--active');
      }
    });
    button.classList.add('img-filters__button--active');
  };

  allFilterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      changeActiveFilterButton(evt.target);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() =>{
        const chosenFilter = evt.target.dataset.sort;
        allPreviews.forEach((preview) => {preview.remove();});
        renderPreviews(data, FILTERS[chosenFilter]);
      }, RENDER_DELAY);
    });
  });
};

export { renderPreviews };
