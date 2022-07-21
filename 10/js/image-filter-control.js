const FILTER_EFFECTS = {
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
  },
  'marvin': {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    type: '%',
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    type: 'px',
  },
  'heat': {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'brightness',
  },
};

const effectsElement = document.querySelector('.effects__list');
const imageUploadPreviewImageElement = document.querySelector(
  '.img-upload__preview__image'
);
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const checkEffectType = (effect) => effect.type ? effect.type : '';

const createSlider = (minValue, maxValue, connectType) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: minValue,
      max: maxValue,
    },
    start: maxValue,
    connect: connectType,
  });
};

const applyFilter = (filterName) => {
  const filterNames = Object.keys(FILTER_EFFECTS);
  const filters = filterNames.map((effect) => `effects__preview--${effect}`);
  imageUploadPreviewImageElement.classList.remove(...filters);
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
    const effectName = FILTER_EFFECTS[filterName];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effectName.min,
        max: effectName.max,
      },
      step: effectName.step,
    });
    sliderElement.noUiSlider.set(effectName.max);
    sliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = sliderElement.noUiSlider.get();
      imageUploadPreviewImageElement.style.filter = `${
        effectName.filter
      }(${sliderElement.noUiSlider.get()}${checkEffectType(effectName)})`;
    });
  }
};

const changeImageFilter = () => {
  effectsElement.addEventListener('change', (evt) => {
    changeFilterSettings(evt.target.value);
  });
};

export { createSlider, changeImageFilter };
