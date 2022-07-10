const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const imageUploadPreviewImageElement = document.querySelector('.img-upload__preview__image');

const INITIAL_SCALE_VALUE = 100;

let scaleValue = INITIAL_SCALE_VALUE;

scaleControlValueElement.value = `${scaleValue}%`;

const toggleImageScale = (scale) => {
  imageUploadPreviewImageElement.classList.remove(
    'image-scale-25',
    'image-scale-50',
    'image-scale-75',
    'image-scale-100');
  imageUploadPreviewImageElement.classList.add(`image-scale-${scale}`);
};

const imageScaleControl = () => {
  scaleControlSmallerButton.addEventListener('click', () => {
    if (scaleValue > 25) {
      scaleValue -= 25;
      scaleControlValueElement.value = `${scaleValue}%`;
      toggleImageScale(scaleValue);
    }
  });

  scaleControlBiggerButton.addEventListener('click', () => {
    if (scaleValue < 100) {
      scaleValue += 25;
      scaleControlValueElement.value = `${scaleValue}%`;
      toggleImageScale(scaleValue);
    }
  });
};

export { imageScaleControl };
