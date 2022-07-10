const effectsElement = document.querySelector('.effects__list');
const imageUploadPreviewImageElement = document.querySelector(
  '.img-upload__preview__image'
);
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

const updateFilterControls = (
  displayValue,
  minValue,
  maxValue,
  stepValue,
  filterValue,
  typeOfvalue
) => {
  sliderElement.style.display = displayValue;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: stepValue,
  });
  sliderElement.noUiSlider.set(maxValue);
  sliderElement.noUiSlider.on('update', () => {
    effectLevelValueElement.value = sliderElement.noUiSlider.get();
    imageUploadPreviewImageElement.style.filter = `${filterValue}(${sliderElement.noUiSlider.get()}${typeOfvalue})`;
  });
};

const toggleImageFilterIntensity = (filterName) => {
  switch (filterName) {
    case 'chrome':
      updateFilterControls('block', 0, 1, 0.1, 'grayscale', '');
      break;
    case 'sepia':
      updateFilterControls('block', 0, 1, 0.1, 'sepia', '');
      break;
    case 'marvin':
      updateFilterControls('block', 0, 100, 1, 'invert', '%');
      break;
    case 'phobos':
      updateFilterControls('block', 0, 3, 0.1, 'blur', 'px');
      break;
    case 'heat':
      updateFilterControls('block', 0, 3, 0.1, 'brightness', '');
      break;
    case 'none':
      imageUploadPreviewImageElement.style.filter = '';
      sliderElement.style.display = 'none';
      break;
  }
};

const toggleImageFilter = (filterName) => {
  imageUploadPreviewImageElement.classList.remove(
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  );
  imageUploadPreviewImageElement.classList.add(
    `effects__preview--${filterName}`
  );
};

const imageFilterControl = () => {
  effectsElement.addEventListener('change', (evt) => {
    if (evt.target.nodeName === 'INPUT') {
      toggleImageFilter(evt.target.value);
      toggleImageFilterIntensity(evt.target.value);
    }
  });
};

export { imageFilterControl };
