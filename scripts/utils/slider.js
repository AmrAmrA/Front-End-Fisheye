/* eslint-disable no-plusplus */
const sliderBlock = document.querySelector('.slider__block');
function displaySlider() {
  // function to increase or decrease the number of likes
  likesContent();
  // function to move forward or backward on the number of slides
  function slidesContent() {
    const rightArrow = document.querySelector('.right__direction');
    const leftArrow = document.querySelector('.left__direction');
    const allMedia = document.querySelectorAll('.artist__media');
    return { allMedia, rightArrow, leftArrow };
  }
  // function to allow to move inside the slider with arrows
  const { allMedia, rightArrow, leftArrow } = slidesContent();
  // function to open the slider with a click or the key enter on the image
  for (const oneMedia of allMedia) {
    oneMedia.addEventListener('click', (e) => {
      setupSlider(e);
    });
    oneMedia.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setupSlider(e);
      }
    });
  }

  function setupSlider(e) {
    const placeImage = document.querySelector('.place__image');
    const mediaArray = Array.from(allMedia);
    placeImage.innerHTML = e.target.dataset.type === 'video'
      ? `<video src="${e.target.src.replace(
        'png',
        'mp4',
      )}" class="central__image" loading ="lazy" controls tabindex="0"></video>
      <h2 class="central__image__legend" tabindex="0">${e.target.alt}</h2>
    `
      : `<img src="${e.target.src}" class="central__image" loading ="lazy" tabindex="0">
      <h2 class="central__image__legend" tabindex="0">${e.target.alt}</h2>`;

    let mediaIndex = mediaArray.indexOf(e.target);

    openTheSlider();

    function nextSlide() {
      if (
        mediaIndex < mediaArray.length - 1
        && mediaArray[mediaIndex + 1].dataset.type === 'video'
      ) {
        placeImage.innerHTML = `<video src="${mediaArray[
          mediaIndex + 1
        ].src.replace(
          'png',
          'mp4',
        )}" class="central__image" loading ="lazy" controls tabindex="0"> </video>
        <h2 class="central__image__legend" tabindex="0">${
  mediaArray[mediaIndex + 1].alt
} </h2>`;
        mediaIndex++;
        return;
      }
      if (
        mediaIndex < mediaArray.length - 1
        && mediaArray[mediaIndex + 1].dataset.type === 'image'
      ) {
        placeImage.innerHTML = `<img src="${
          mediaArray[mediaIndex + 1].src
        }" class="central__image" loading ="lazy" tabindex="0">
        <h2 class="central__image__legend" tabindex="0">${
  mediaArray[mediaIndex + 1].alt
} </h2> `;
        mediaIndex++;
        return;
      }
      placeImage.innerHTML = mediaArray[0].dataset.type === 'video'
        ? `<video src="${mediaArray[0].src.replace(
          'png',
          'mp4',
        )}" class="central__image" loading ="lazy" controls tabindex="0"></video>
        <h2 class="central__image__legend" tabindex="0">${
  mediaArray[0].alt
} </h2>`
        : `<img src="${mediaArray[0].src}" class="central__image" loading ="lazy" tabindex="0">
        <h2 class="central__image__legend" tabindex="0">${mediaArray[0].alt} </h2>`;
      mediaIndex = 0;
    }

    function previousSlide() {
      if (mediaIndex > 0 && mediaArray[mediaIndex].dataset.type === 'video') {
        placeImage.innerHTML = `<video src="${mediaArray[
          mediaIndex
        ].src.replace(
          'png',
          'mp4',
        )}" class="central__image" loading ="lazy" controls tabindex="0"></video>
            <h2 class="central__image__legend" tabindex="0">${
  mediaArray[mediaIndex].alt
} </h2>`;
        mediaIndex--;
        return;
      }
      if (mediaIndex > 0 && mediaArray[mediaIndex].dataset.type === 'image') {
        placeImage.innerHTML = `<img src="${mediaArray[mediaIndex].src}" class="central__image" loading ="lazy" tabindex="0">
        <h2 class="central__image__legend" tabindex="0">${mediaArray[mediaIndex].alt} </h2>`;
        mediaIndex--;
        return;
      }
      placeImage.innerHTML = mediaIndex === 0 && mediaArray[mediaIndex].dataset.type === 'video'
        ? `
      <video src="${mediaArray[mediaIndex].src.replace(
    'png',
    'mp4',
  )}" class="central__image" loading ="lazy" controls tabindex="0"></video>
        <h2 class="central__image__legend" tabindex="0">${
  mediaArray[mediaIndex].alt
} </h2>
        `
        : `<img src="${mediaArray[mediaIndex].src}" class="central__image" loading ="lazy" tabindex="0">
        <h2 class="central__image__legend" tabindex="0">${mediaArray[mediaIndex].alt} </h2>`;
      mediaIndex = mediaArray.length - 1;
    }

    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', previousSlide);

    function arrowClick(event) {
      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        nextSlide();
      }
      if (event.key === 'ArrowLeft') {
        previousSlide();
      }
    }

    sliderBlock.addEventListener('keydown', arrowClick);
  }
}

setTimeout(displaySlider, 1000);

// function to setup the increment of likes

// increment likes with mouse or the key enter
const totalOfLikes = document.querySelector('.totalOFlIkes');
function incrementLikes(heartMedia, likesNumberMedia) {
  for (let i = 0; i < heartMedia.length; i++) {
    if (
      heartMedia[i].addEventListener('click', () => {
        if (!heartMedia[i].classList.contains('heart__toggle')) {
          return;
        }
        likesNumberMedia[i].textContent++;
        totalOfLikes.textContent++;
        heartMedia[i].classList.remove('heart__toggle');
      })
    );
    else if (
      heartMedia[i].addEventListener('keydown', (e) => {
        if (
          e.key !== 'Enter'
          && heartMedia[i].classList.contains('heart__toggle')
        ) {
          return;
        }
        likesNumberMedia[i].textContent++;
        totalOfLikes.textContent++;
        heartMedia[i].classList.remove('heart__toggle');
      })
    );
  }
}
function likesContent() {
  const heartMedia = document.querySelectorAll('.heart__media');
  const likesNumberMedia = document.querySelectorAll('.likesNumber');
  incrementLikes(heartMedia, likesNumberMedia);
}

// function to open the slider and hide the other elements
const labelText = document.querySelector('.label__sort');
const pageHeader = document.querySelector('.page__header');
const photographersSection = document.querySelector('.photograph-header');
const mediaSection = document.querySelector('.photograph__medias');
function openTheSlider() {
  sliderBlock.style.display = 'block';
  mediaSection.style.display = 'none';
  photographersSection.style.display = 'none';
  pageHeader.style.display = 'none';
  const dropDown = document.querySelector('#photo__sort');
  dropDown.style.display = 'none';
  labelText.style.display = 'none';
  const closeSlider = document.querySelector('.close__slider');
  closeSlider.addEventListener('click', closeTheSlider);
  body.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTheSlider();
    }
  });
}

// function to close the slider and show the other elements
function closeTheSlider() {
  sliderBlock.style.display = 'none';
  mediaSection.style.display = 'flex';
  photographersSection.style.display = 'block';
  pageHeader.style.display = 'flex';
  const dropDown = document.querySelector('#photo__sort');
  dropDown.style.display = 'inline';
  labelText.style.display = 'inline';
}
setTimeout(closeTheSlider, 1000);
