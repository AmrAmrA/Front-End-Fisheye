const PhotographerId = new URLSearchParams(window.location.search).get("id");

async function displayDataAndMedia() {
  const response = await fetch("data/photographers.json");
  if (!response.ok) 
  { const message = `An error has occured: ${response.status}`;
    throw new Error(message);}
  const data = await response.json();
  return data;
}

displayDataAndMedia().then((data) => {
  // Display the photographer's card header
  {
    const photographersSection = document.querySelector(".photograph-header");
    for (const photographPage of data.photographers) {
      if (photographPage.id == PhotographerId) {
        const photographeModel = new photographerFactory(photographPage,"onePhotographer");
        const userCardDOM = photographeModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      }
    }
  }
  // Display the photographer's gallery media 
  for (let media of data.media) {
    if (media.photographerId == PhotographerId) {
      const mediaSection = document.querySelector(".photograph__medias");
      const mediaModel    = new mediaFactory(media);
        const mediaCardDOM  = mediaModel.getuserGalleryCard();
        mediaSection.appendChild(mediaCardDOM);
      }
    }
  ;

});


function displaySlider () {
  const allMedia = document.querySelectorAll(".artist__media");
  for (let oneMedia of allMedia) {
    oneMedia.addEventListener("click", (e) => {
        const sliderBlock = document.querySelector(".slider__block");
        const centralImage = document.querySelector(".central__image");
        const rightArrow = document.querySelector(".right__direction");
        const leftArrow = document.querySelector(".left__direction");
        sliderBlock.style.display = "block";
        centralImage.src = e.target.src;
        const mediaArray = Array.from(allMedia);
        let mediaIndex = mediaArray.indexOf(e.target);
        rightArrow.addEventListener("click", () => {
          if (mediaIndex < mediaArray.length - 1) 
          {
            centralImage.src = mediaArray[mediaIndex + 1].src;
            mediaIndex++;
            console.log(mediaIndex);
            console.log(centralImage);
          } else {
            centralImage.src = mediaArray[0].src;
            mediaIndex = 0;
          }
        });

        leftArrow.addEventListener("click", () => {
          if (mediaIndex > 0) {
            centralImage.src = mediaArray[mediaIndex - 1].src;
            mediaIndex--;
          } else {
            centralImage.src = mediaArray[mediaArray.length - 1].src;
            mediaIndex = mediaArray.length - 1;
          }
        });
      }); 
    }};

setTimeout(displaySlider, 1000);