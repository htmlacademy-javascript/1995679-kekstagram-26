const pictureTemplate = document.querySelector('#picture').content;
const picturesPreviewsElement = document.querySelector('.pictures');

const getPhotoData = (photoData) => {
  const photo = {
    id: photoData.id,
    url: photoData.url,
    description: photoData.description,
    likes: photoData.likes,
    comments: photoData.comments,
  };

  return photo;
};

const getPhotos = (data) => {
  const photos = [];

  for (let i = 0; i < data.length; i++) {
    photos.push(getPhotoData(data[i]));
  }
  return photos;
};

const getPreviews = (data) => {
  const photos = getPhotos(data);

  const photosFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const url = pictureElement.querySelector('img');
    const likes = pictureElement.querySelector('.picture__likes');
    const comments = pictureElement.querySelector('.picture__comments');
    url.src = photo.url;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;
    photosFragment.appendChild(pictureElement);
  });

  picturesPreviewsElement.appendChild(photosFragment);
};

export { getPreviews };
