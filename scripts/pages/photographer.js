const PhotographerId          = new URLSearchParams(window.location.search).get("id");

function displayData() {
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      let photographersSection = document.querySelector(".photograph-header");
      for (let photographPage of data.photographers) {
        if (photographPage.id == PhotographerId) {
          const { name } = photographPage;
          const photographeModel = new photographerFactory(
            photographPage,
            "onePhotographer"
          );
          const userCardDOM = photographeModel.getUserCardDOM();
          photographersSection.appendChild(userCardDOM);
          const contactTitle = document.querySelector(".contact__title");
          contactTitle.innerHTML = `
          <h2 class="contact__title">Contactez-moi <br> ${name}</h2>`
          contact_modal.setAttribute('name', `Contactez-moi ${name}`);
        }
      }
    });
}

displayData();

function displayMedia () {
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      const mediaSection = document.querySelector(".photograph__medias");
      for (let media of data.media) {
        if (media.photographerId == PhotographerId) {
          const mediaModel = new mediaFactory(media);
          const mediaCardDOM = mediaModel.getuserGalleryCard();
          mediaSection.appendChild(mediaCardDOM);
        }
      }
    });
}
displayMedia();