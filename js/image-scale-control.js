const INITIAL_SCALE_VALUE = 100;

const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const imageUploadPreviewImageElement = document.querySelector('.img-upload__preview__image');

let scaleValue = INITIAL_SCALE_VALUE;
scaleControlValueElement.value = INITIAL_SCALE_VALUE;

const toggleImageScale = (scale) => {
  scaleControlValueElement.value = `${scale}%`;
  imageUploadPreviewImageElement.style.transform = `scale(${scale / 100})`;
};

const changeImageScaleControl = (min, max, step) => {
  toggleImageScale(scaleValue);

  scaleControlSmallerButton.addEventListener('click', () => {
    if (scaleValue > min) {
      scaleValue -= step;
      if (scaleValue < min) {scaleValue = min;}
      toggleImageScale(scaleValue);
    }
  });

  scaleControlBiggerButton.addEventListener('click', () => {
    if (scaleValue < max) {
      scaleValue += step;
      if (scaleValue > max) {scaleValue = max;}
      toggleImageScale(scaleValue);
    }
  });
};

const resetImageScaleControl = () => {
  scaleValue = INITIAL_SCALE_VALUE;
  toggleImageScale(scaleValue);
};

export { changeImageScaleControl, resetImageScaleControl };
