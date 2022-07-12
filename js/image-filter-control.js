const effectsElement = document.querySelector('.effects__list');
const imageUploadPreviewImageElement = document.querySelector(
  '.img-upload__preview__image'
);
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const FILTER_EFFECTS = {
  'effects__preview--chrome': {
    minValue: 0,
    maxValue: 1,
    stepValue: 0.1,
    filterValue: 'grayscale',
    typeOfvalue: '',
  },
  'effects__preview--sepia': {
    minValue: 0,
    maxValue: 1,
    stepValue: 0.1,
    filterValue: 'sepia',
    typeOfvalue: '',
  },
  'effects__preview--marvin': {
    minValue: 0,
    maxValue: 100,
    stepValue: 1,
    filterValue: 'invert',
    typeOfvalue: '%',
  },
  'effects__preview--phobos': {
    minValue: 0,
    maxValue: 3,
    stepValue: 0.1,
    filterValue: 'blur',
    typeOfvalue: 'px',
  },
  'effects__preview--heat': {
    minValue: 0,
    maxValue: 3,
    stepValue: 0.1,
    filterValue: 'brightness',
    typeOfvalue: '',
  },
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

const applyFilter = (filterName) => {
  const filterNames = Object.keys(FILTER_EFFECTS);
  imageUploadPreviewImageElement.classList.remove(...filterNames);
  imageUploadPreviewImageElement.classList.add(
    `effects__preview--${filterName}`
  );
};

const changeFilterSettings = (filterName) => {
  applyFilter(filterName);
  if (filterName === 'none') {
    imageUploadPreviewImageElement.style.filter = '';
    sliderElement.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
    const effectName = FILTER_EFFECTS[`effects__preview--${filterName}`];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effectName.minValue,
        max: effectName.maxValue,
      },
      step: effectName.stepValue,
    });
    sliderElement.noUiSlider.set(effectName.maxValue);
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = sliderElement.noUiSlider.get();
      imageUploadPreviewImageElement.style.filter = `${
        effectName.filterValue
      }(${sliderElement.noUiSlider.get()}${effectName.typeOfvalue})`;
    });
  }
};

const imageFilterControl = () => {
  effectsElement.addEventListener('change', (evt) => {
    changeFilterSettings(evt.target.value);
    // toggleImageFilter(evt.target.value);
    // toggleImageFilterIntensity(evt.target.value);
  });
};

export { imageFilterControl };
