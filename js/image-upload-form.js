import { checkHashtagField } from './check-hashtag.js';
import { sendData } from './api.js';
import { showSuccessMessage } from './success.js';
import { showErrorMessage } from './error.js';
import { changeImageScaleControl, resetImageScaleControl } from './image-scale-control.js';
import { changeImageFilter } from './image-filter-control.js';

const MAX_AMOUNT_OF_HASHTAGS = 5;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadControlElement = document.querySelector('.img-upload__input');
const textHashtagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const imageUploadForm = document.querySelector('.img-upload__form');
const errorMessageElement = document.querySelector('.error-message');
const sendButton = document.querySelector('.img-upload__submit');
const defaultEffectRadioElement = document.getElementById('effect-none');

const resetForm = () => {
  imgUploadControlElement.value = '';
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';
  errorMessageElement.textContent = '';
  defaultEffectRadioElement.checked = true;
  resetImageScaleControl();
};

const closeUploadForm = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  resetForm();
};

const openUploadForm = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscKeydown);
  changeImageFilter();
};

function onUploadFormEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (
      textHashtagsElement !== document.activeElement &&
      textDescriptionElement !== document.activeElement
    ) {
      closeUploadForm();
    }
  }
}

const blockSendButton = () => {
  sendButton.disabled = true;
};

const unblockSendButton = () => {
  sendButton.disabled = false;
};

const imageUploadFormControlHandler = (pristine) => {
  changeImageScaleControl(MIN_SCALE_VALUE, MAX_SCALE_VALUE, SCALE_VALUE_STEP);

  imgUploadCancelButton.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onUploadFormEscKeydown);
  imgUploadControlElement.addEventListener('change', openUploadForm);
  textHashtagsElement.addEventListener('input', () => {
    errorMessageElement.textContent = '';
  });

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formIsValid = pristine.validate();
    if (formIsValid && textHashtagsElement.value === '') {
      blockSendButton();
      sendData(
        () => {closeUploadForm(); showSuccessMessage(); unblockSendButton();},
        () => {showErrorMessage(); unblockSendButton();},
        formData
      );
    }
    else {
      const hashtagsAreValid = checkHashtagField(textHashtagsElement.value, MAX_AMOUNT_OF_HASHTAGS);
      if (formIsValid && hashtagsAreValid) {
        blockSendButton();
        sendData(
          () => {closeUploadForm(); showSuccessMessage(); unblockSendButton();},
          () => {showErrorMessage(); unblockSendButton();},
          formData
        );
      }
      else {errorMessageElement.textContent = `Только уникальные валидные хэштеги, не больше ${MAX_AMOUNT_OF_HASHTAGS}`;}
    }
  });
};

export { imageUploadFormControlHandler };
