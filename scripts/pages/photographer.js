let PhotographerId = new URLSearchParams(window.location.search).get("id");

function displayData() {
  fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      let photographersSection = document.querySelector(".photograph-header");
      for (let photographPage of data.photographers) {
        console.log(photographPage);
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

const headerButton = document.querySelector(".header__button");

const contact_modal = document.querySelector("#contact_modal");
const globalFilter = document.querySelector(".globalFilter");
const crossClose = document.querySelector(".cross__close");
console.log(crossClose);

headerButton.addEventListener("click", function () {
  contact_modal.style.display = "block";
  globalFilter.classList.toggle('toggleVisibility')
});


crossClose.addEventListener("click", function () {
  contact_modal.style.display = "none";
  globalFilter.classList.toggle('toggleVisibility')
});