import { shuffle } from './util.js';

const RANDOM_PHOTOS_AMOUNT = 10;

const pictureTemplate = document.querySelector('#picture').content;
const picturesPreviewsElement = document.querySelector('.pictures');
const imageFiltersControls = document.querySelector('.img-filters');
const defaultFilterButton = imageFiltersControls.querySelector('#filter-default');
const randomFilterButton = imageFiltersControls.querySelector('#filter-random');
const discussedFilterButton = imageFiltersControls.querySelector('#filter-discussed');

const showImageFilters = () => {
  imageFiltersControls.classList.remove('img-filters--inactive');
};

const getPhotoData = (photoData) => {
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
    photos.push(getPhotoData(data[i]));
  }
  return photos;
};

const defaultFilter = (elements) => elements;

const randomFilter = (elements) => {
  shuffle(elements);
  while (elements.length > RANDOM_PHOTOS_AMOUNT) {
    elements.pop();
  }
};

const discussedFilter = (elements) => {

  const comparePopularity = (photoA, photoB) => {
    const commentsA = photoA.comments.length;
    const commentsB = photoB.comments.length;
    return commentsB - commentsA;
  };

  elements.sort(comparePopularity);
};

const getPreviews = (data, filter) => {
  const photos = getPhotos(data).slice();

  const photosFragment = document.createDocumentFragment();

  if (filter) {filter(photos);}

  photos
    .forEach((photo) => {
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

const changeActiveFilterButton = (button) => {
  const allFilterButtons = document.querySelectorAll('.img-filters__button');
  allFilterButtons.forEach((buttonElement) => {buttonElement.classList.remove('img-filters__button--active');});
  button.classList.add('img-filters__button--active');
};

const setDefaultFilterButtonClick = (data) => {
  defaultFilterButton.addEventListener('click', () => {
    const allPreviews = document.querySelectorAll('.picture');
    allPreviews.forEach((preview) => {preview.remove();});
    getPreviews(data, defaultFilter);
    changeActiveFilterButton(defaultFilterButton);
  });
};

const setRandomFilterButtonClick = (data) => {
  randomFilterButton.addEventListener('click', () => {
    const allPreviews = document.querySelectorAll('.picture');
    allPreviews.forEach((preview) => {preview.remove();});
    getPreviews(data, randomFilter);
    changeActiveFilterButton(randomFilterButton);
  });
};

const setDiscussedFilterButtonClick = (data) => {
  discussedFilterButton.addEventListener('click', () => {
    const allPreviews = document.querySelectorAll('.picture');
    allPreviews.forEach((preview) => {preview.remove();});
    getPreviews(data, discussedFilter);
    changeActiveFilterButton(discussedFilterButton);
  });
};

export { getPreviews, showImageFilters, setDefaultFilterButtonClick, setRandomFilterButtonClick, setDiscussedFilterButtonClick };
