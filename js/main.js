import { getPreviews } from './get-previews.js';
import { imageUploadFormControlHandler } from './image-upload-form.js';
import { changeImageScale } from './image-scale-control.js';
import { imageFilterControl } from './image-filter-control.js';

getPreviews(3,2);
imageUploadFormControlHandler();
changeImageScale();
imageFilterControl();
