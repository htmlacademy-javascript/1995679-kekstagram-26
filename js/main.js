import { getPreviews } from './get-previews.js';
import { imageUploadFormControlHandler } from './image-upload-form.js';
import { changeImageScale } from './image-scale-control.js';
import { createSlider, changeImageFilter } from './image-filter-control.js';

const imageUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imageUploadForm);

getPreviews(3,2);
imageUploadFormControlHandler(pristine);
changeImageScale(25, 100, 25);

createSlider(0, 1, 'lower');
changeImageFilter();
