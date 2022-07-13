import { getPreviews } from './get-previews.js';
import { imageUploadFormControlHandler } from './image-upload-form.js';
import { changeImageScale } from './image-scale-control.js';
import { createSlider, changeImageFilter } from './image-filter-control.js';

getPreviews(3,2);
imageUploadFormControlHandler();
changeImageScale();

createSlider(0, 1, 'lower');
changeImageFilter();
