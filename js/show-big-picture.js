const AMOUNT_OF_COMMENTS_PER_LOAD = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
// const closeButton = document.querySelector('.big-picture__cancel');
const bigPicturePhoto = document.querySelector('.big-picture__img img');
const bigPictureLikeCountElement = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const bigPictureCommentsCountElement = document.querySelector('.comments-count');
const commentTemplate = document.querySelector('#comment').content;
const bigPictureCommentsElement = document.querySelector('.social__comments');
const loadMoreCommentsButton = document.querySelector('.social__comments-loader');
const loadedCommentsCountElement = document.querySelector('.comments-count-loaded');

let comments = [];
let commentsCounter = 0;

const loadSomeComments = (elements, amount) => {
  const commentsToLoad = elements.splice(0, amount);

  if (elements.length === 0) {
    loadMoreCommentsButton.classList.add('hidden');
  };

  return commentsToLoad};

function onUploadFormEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePreviewForm();
  }
}

const closePreviewForm = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  bigPictureCommentsElement.innerHTML = '';
  commentsCounter = 0;
  loadedCommentsCountElement.textContent = commentsCounter;
  document.removeEventListener('keydown', onUploadFormEscKeydown);
};

const openPreviewForm = () => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  loadMoreCommentsButton.classList.remove('hidden');
  document.addEventListener('keydown', onUploadFormEscKeydown);
};

const renderComments = (elements) => {

  const commentsFragment = document.createDocumentFragment();

  elements
  .forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const author = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    author.src = comment.avatar;
    author.alt = comment.name;
    commentText.textContent = comment.message;
    commentsFragment.appendChild(commentElement);
  });

  bigPictureCommentsElement.appendChild(commentsFragment);

  commentsCounter += elements.length;
  loadedCommentsCountElement.textContent = commentsCounter;
};

const showChosenPicture = (photo, data) => {
  const pictureImage = photo.querySelector('.picture__img');
  const pictureInfo = photo.querySelector('.picture__info');
  const pictureLikes = pictureInfo.querySelector('.picture__likes');
  socialCaption.textContent = data[photo.dataset.id].description;
  bigPictureCommentsCountElement.textContent = data[photo.dataset.id].comments.length;

  const findPictureData = (elements) => {
    return elements.find(element => element.id.toString() === photo.dataset.id);
  };

  const pictureData = findPictureData(data);
  comments = pictureData.comments.slice();

  const loadedComments = loadSomeComments(comments, AMOUNT_OF_COMMENTS_PER_LOAD)

  renderComments(loadedComments);

  bigPicturePhoto.src = pictureImage.src;
  bigPicturePhoto.alt = pictureImage.alt;
  bigPictureLikeCountElement.textContent = pictureLikes.textContent;
};

const setCloseBiPictureButtonClick = () => {
  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', closePreviewForm);
};

const setLoadMoreCommentsButtonClick = () => {
  loadMoreCommentsButton.addEventListener('click', () => {
    const loadedComments = loadSomeComments(comments, AMOUNT_OF_COMMENTS_PER_LOAD);
    renderComments(loadedComments);
  });
};

export { openPreviewForm, showChosenPicture, setCloseBiPictureButtonClick, setLoadMoreCommentsButtonClick };
