import { getPreviews } from './get-previews.js';
import { imageUploadFormControlHandler } from './image-upload-form.js';
import { changeImageScale } from './image-scale-control.js';
import { createSlider, changeImageFilter } from './image-filter-control.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(imageUploadForm);

imageUploadFormControlHandler(pristine);
changeImageScale(25, 100, 25);

createSlider(0, 1, 'lower');
changeImageFilter();

getData(
  (data) => {getPreviews(data);},
  (error) => {showAlert(`${error} - Не удается подгрузить данные. попробуйте еще`);}
);
