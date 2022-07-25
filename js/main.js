import { renderPreviews, setApplyFilterButtonClick } from './render-previews.js';
import { imageUploadFormControlHandler } from './image-upload-form.js';
import { createSlider } from './image-filter-control.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageFiltersControls = document.querySelector('.img-filters');
const pristine = new Pristine(imageUploadForm);

imageUploadFormControlHandler(pristine);
createSlider(0, 1, 'lower');

getData(
  (data) => {
    renderPreviews(data);
    imageFiltersControls.classList.remove('img-filters--inactive');
    setApplyFilterButtonClick(data);
  },
  (error) => {showAlert(`${error} - Не удается подгрузить данные. попробуйте еще`);}
);
