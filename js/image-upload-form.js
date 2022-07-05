const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const imgUploadControl = document.querySelector('.img-upload__input');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imageUploadForm = document.querySelector('.img-upload__form');

const resetForm = () => {
  imgUploadControl.value = '';
  textHashtags.value = '';
  textDescription.value = '';
}

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

const pristine = new Pristine(imageUploadForm);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Form is VALID')
    // imageUploadForm.submit();
  }
  else {
    console.log('Form is invalid')
  }
})

export { imageUploadFormControlHandler };
