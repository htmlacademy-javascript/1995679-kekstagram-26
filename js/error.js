const bodyElement = document.querySelector('body');
const successMessageTemplate = document.querySelector('#error').content;
// imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKedown);
  document.removeEventListener('click', onErrorMessageClick);
};

function onErrorMessageEscKedown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorMessage();
  }
};

function onErrorMessageClick (evt) {
  const errorMessage = document.querySelector('.error');
  if (evt.target === errorMessage) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorMessageFragment = document.createDocumentFragment();
  const erroMessageElement = successMessageTemplate.cloneNode(true);
  const closeButton = erroMessageElement.querySelector('.error__button');

  errorMessageFragment.appendChild(erroMessageElement);
  bodyElement.appendChild(errorMessageFragment);
  closeButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKedown);
  document.addEventListener('click', onErrorMessageClick);
};

export { showErrorMessage };
