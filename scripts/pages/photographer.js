const sliderBlock = document.querySelector(".slider__block");
const PhotographerId = new URLSearchParams(window.location.search).get("id");
const mediaSection = document.querySelector(".photograph__medias");
const photographersSection = document.querySelector(".photograph-header");
const pageHeader = document.querySelector(".page__header");

async function displayDataAndMedia() {
  const response = await fetch("data/photographers.json");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

displayDataAndMedia().then((data) => {
  // Display the photographer's card header
  {
    for (const photographPage of data.photographers) {
      if (photographPage.id == PhotographerId) {
        const photographeModel = new photographerFactory(
          photographPage,
          "onePhotographer"
        );
        const userCardDOM = photographeModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      }
    }
  }
  // Display the photographer's gallery media
  for (let media of data.media) {
    if (media.photographerId == PhotographerId) {
      const mediaModel = new mediaFactory(media);
      const mediaCardDOM = mediaModel.getuserGalleryCard();
      mediaSection.appendChild(mediaCardDOM);
    }
  }
});

function openTheSlider() {
  sliderBlock.style.display = "block";
  mediaSection.style.display = "none";
  photographersSection.style.display = "none";
  pageHeader.style.display = "none";
}
function closeTheSlider() {
  sliderBlock.style.display = "none";
  mediaSection.style.display = "flex";
  photographersSection.style.display = "block";
  pageHeader.style.display = "flex";
}











function displaySlider() {
  const allMedia = document.querySelectorAll(".artist__media");
  const closeSlider = document.querySelector(".close__slider");
  closeSlider.addEventListener("click", closeTheSlider);

  body.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeTheSlider();
    }
  });


  for (let oneMedia of allMedia) {
    oneMedia.addEventListener("click", (e) => {
      const centralImage = document.querySelector(".central__image");
      const rightArrow = document.querySelector(".right__direction");
      const leftArrow = document.querySelector(".left__direction");

      centralImage.src = e.target.src;
      const mediaArray = Array.from(allMedia);
      let mediaIndex = mediaArray.indexOf(e.target);
      rightArrow.addEventListener("click", nextSlide);
      leftArrow.addEventListener("click", previousSlide);

      openTheSlider();

      function nextSlide() {
        if (mediaIndex < mediaArray.length - 1) {
          centralImage.src = mediaArray[mediaIndex + 1].src;
          mediaIndex++;
          console.log(mediaIndex);
          console.log(centralImage);
        } else {
          centralImage.src = mediaArray[0].src;
          mediaIndex = 0;
        }
      }

      function previousSlide() {
        if (mediaIndex > 0) {
          centralImage.src = mediaArray[mediaIndex - 1].src;
          mediaIndex--;
        } else {
          centralImage.src = mediaArray[mediaArray.length - 1].src;
          mediaIndex = mediaArray.length - 1;
        }
      }

      function arrowClick(event) {
        if (event.keyCode == 39) {
          nextSlide();
          return;
        } else if (event.keyCode == 37) {
          previousSlide();
        }
      }

      body.addEventListener("keydown", arrowClick);
    });
  }
}

setTimeout(displaySlider, 1000);
let firstOption = document.querySelector(".firstOption");
let customOptions = document.querySelector(".custom__options");
console.log(customOptions);
customOptions.addEventListener("click", (e) => {
  customOptions.classList.toggle("full__height");
  console.log(e.target.offsetTop);
   firstOption.offsetTop = e.target.offsetTop;
  // if (e.target.classList.contains("custom__option")) {
  //   const selected = document.querySelector(".custom__option--selected");
  //   selected.classList.remove("custom__option--selected");
  //   e.target.classList.add("custom__option--selected");
  // }
} 
);