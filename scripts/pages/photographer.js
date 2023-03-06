const sliderBlock = document.querySelector(".slider__block");
const PhotographerId = new URLSearchParams(window.location.search).get("id");
const mediaSection = document.querySelector(".photograph__medias");
const photographersSection = document.querySelector(".photograph-header");
const pageHeader = document.querySelector(".page__header");
const optionTitle = document.querySelector(".select__title");

let totalOfLikes = document.querySelector(".totalOFlIkes");
let moneyDay = document.querySelector(".moneyDay");
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
        console.log(photographPage.price);
        moneyDay.textContent = `${photographPage.price}€/ jour`;
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
    let zero = 0;
    const AllLikes = document.querySelectorAll(".likesNumber");
    for (let i = 0; i < AllLikes.length; i++) {
      let total =  zero += parseInt(AllLikes[i].textContent);
      totalOfLikes.textContent = `${total}`;
    }
  }
});