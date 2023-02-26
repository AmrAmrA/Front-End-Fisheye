let PhotographerId = new URLSearchParams(window.location.search).get("id");

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
          contactTitle.textContent = `Contactez-moi ${name}`;
        }
      }
    });
}

displayData();

