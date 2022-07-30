import { renderPreviews } from './render-previews.js';
import { imageUploadFormControlHandler } from './image-upload-form.js';
import { createSlider } from './image-filter-control.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { uploadPhoto } from './upload-photo.js';
import { setLoadMoreCommentsButtonClick, setCloseBiPictureButtonClick } from './show-big-picture.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageFiltersControls = document.querySelector('.img-filters');
const pristine = new Pristine(imageUploadForm);

imageUploadFormControlHandler(pristine);
createSlider(0, 1, 'lower');
uploadPhoto();
setLoadMoreCommentsButtonClick();
setCloseBiPictureButtonClick();

getData(
  (data) => {
    renderPreviews(data);
    imageFiltersControls.classList.remove('img-filters--inactive');
  },
  (error) => {showAlert(`${error} - Не удается подгрузить данные. попробуйте еще`);}
);
