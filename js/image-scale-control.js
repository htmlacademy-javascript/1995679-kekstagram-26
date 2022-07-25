const INITIAL_SCALE_VALUE = 100;

const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const imageUploadPreviewImageElement = document.querySelector('.img-upload__preview__image');

const toggleImageScale = (scale) => {
  imageUploadPreviewImageElement.style.transform = `scale(${scale / 100})`;
};

const changeImageScale = (min, max, step) => {
  let scaleValue = INITIAL_SCALE_VALUE;
  scaleControlValueElement.value = `${scaleValue}%`;
  toggleImageScale(scaleValue);

  scaleControlSmallerButton.addEventListener('click', () => {
    if (scaleValue > min) {
      scaleValue -= step;
      if (scaleValue < min) {scaleValue = min;}
      scaleControlValueElement.value = `${scaleValue}%`;
      toggleImageScale(scaleValue);
    }
  });

  scaleControlBiggerButton.addEventListener('click', () => {
    if (scaleValue < max) {
      scaleValue += step;
      if (scaleValue > max) {scaleValue = max;}
      scaleControlValueElement.value = `${scaleValue}%`;
      toggleImageScale(scaleValue);
    }
  });
};

export { changeImageScale };
