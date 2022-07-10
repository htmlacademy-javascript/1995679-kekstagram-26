import { checkHashtagField } from './check-hashtag.js';

const MAX_AMOUNT_OF_HASHTAGS = 5;

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadControl = document.querySelector('.img-upload__input');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imageUploadForm = document.querySelector('.img-upload__form');
const errorMessage = document.querySelector('.error-message');

const resetForm = () => {
  imgUploadControl.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  errorMessage.textContent = '';
};

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  resetForm();
};

const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadFormEscKeydown);
};

function onUploadFormEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (
      textHashtags !== document.activeElement &&
      textDescription !== document.activeElement
    ) {
      closeUploadForm();
    }
  }
}

const imageUploadFormControlHandler = () => {
  imgUploadCancelButton.addEventListener('click', () => {
    closeUploadForm();
  });

  document.addEventListener('keydown', onUploadFormEscKeydown);
  imgUploadControl.addEventListener('change', () => {
    openUploadForm();
  });
};

textHashtags.addEventListener('input', () => {
  errorMessage.textContent = '';
});

const pristine = new Pristine(imageUploadForm);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formIsValid = pristine.validate();
  const hashtagsAreValid = checkHashtagField(textHashtags.value, MAX_AMOUNT_OF_HASHTAGS);
  if (formIsValid && hashtagsAreValid) {
    imageUploadForm.submit();
  }
  else {
    errorMessage.textContent = `Только уникальные валидные хэштеги, не больше ${MAX_AMOUNT_OF_HASHTAGS}`;
  }
});

export { imageUploadFormControlHandler };
