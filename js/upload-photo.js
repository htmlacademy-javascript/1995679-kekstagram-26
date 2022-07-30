
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const photoChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview__image');

const uploadPhoto = () => {
  photoChooser.addEventListener('change', () => {
    const photo = photoChooser.files[0];
    const fileName = photo.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(photo);
    }
  });
};

export { uploadPhoto };
