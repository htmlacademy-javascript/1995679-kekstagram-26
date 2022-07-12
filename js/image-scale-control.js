const INITIAL_SCALE_VALUE = 100;

const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
const imageUploadPreviewImageElement = document.querySelector('.img-upload__preview__image');

const toggleImageScale = (scale) => {
  imageUploadPreviewImageElement.style = `transform: scale(${scale / 100}); transition: transform 0.3s;`;
};

const changeImageScale = () => {
  let scaleValue = INITIAL_SCALE_VALUE;
  scaleControlValueElement.value = `${scaleValue}%`;

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

export { changeImageScale };
