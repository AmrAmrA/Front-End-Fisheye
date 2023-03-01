const PhotographerId = new URLSearchParams(window.location.search).get("id");

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




const sliderBlock = document.querySelector(".slider__block");
const centralImage = document.querySelector(".central__image");

  const allMedia = document.querySelectorAll(".artist__media");
  console.log(allMedia);
  const rightArrow = document.querySelector(".right__direction");
  console.log(rightArrow);

  for (let oneMedia of allMedia) {
    oneMedia.addEventListener("click", (e) => {
      globalFilter.classList.toggle("toggleVisibility");
      sliderBlock.style.display = "block";
      centralImage.src = e.target.src;
      const mediaArray = Array.from(allMedia);
      rightArrow.addEventListener("click", () => {
        const currentMediaIndex = mediaArray.indexOf(oneMedia);
        if (currentMediaIndex < mediaArray.length - 1) {
          console.log(currentMediaIndex + 1);
          console.log(currentMediaIndex);
          console.log(mediaArray.indexOf(oneMedia));
          console.log(mediaArray.length - 1);
          centralImage.src = mediaArray[currentMediaIndex + 1].src;
        } else {
          centralImage.src = mediaArray[0].src;
        }
      });
    });
  }

