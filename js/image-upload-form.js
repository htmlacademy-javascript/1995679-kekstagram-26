import { checkHashtagField } from './check-hashtag.js';

const MAX_AMOUNT_OF_HASHTAGS = 5;

const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadControlElement = document.querySelector('.img-upload__input');
const textHashtagsElement = document.querySelector('.text__hashtags');
const textDescriptionElement = document.querySelector('.text__description');
const imageUploadForm = document.querySelector('.img-upload__form');
const errorMessageElement = document.querySelector('.error-message');

const resetForm = () => {
  imgUploadControlElement.value = '';
  textHashtagsElement.value = '';
  textDescriptionElement.value = '';
  errorMessageElement.textContent = '';
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

const imageUploadFormControlHandler = (pristine) => {
  imgUploadCancelButton.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onUploadFormEscKeydown);
  imgUploadControlElement.addEventListener('change', openUploadForm);

  textHashtagsElement.addEventListener('input', () => {
    errorMessageElement.textContent = '';
  });

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formIsValid = pristine.validate();
    if (formIsValid && textHashtagsElement.value === '') {
      imageUploadForm.submit();
    }
    else {
      const hashtagsAreValid = checkHashtagField(textHashtagsElement.value, MAX_AMOUNT_OF_HASHTAGS);
      if (formIsValid && hashtagsAreValid) {
        imageUploadForm.submit();
      }
      else {errorMessageElement.textContent = `Только уникальные валидные хэштеги, не больше ${MAX_AMOUNT_OF_HASHTAGS}`;}
    }
  });
};

export { imageUploadFormControlHandler };
