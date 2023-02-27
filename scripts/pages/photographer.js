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


const sliderBlock = document.querySelector(".slider__block");
const centralImage = document.querySelector(".central__image");
function constructSlider() {
  const allMedia = document.querySelectorAll(".artist__media");
  console.log(allMedia);
  const rightArrow = document.querySelector(".right__direction");
  console.log(rightArrow);

  
  for  (let oneMedia of allMedia) {
    oneMedia.addEventListener("click", (e) => {
      globalFilter.classList.toggle("toggleVisibility");
      sliderBlock.style.display = "block";
      centralImage.src = e.target.src;
      
      
      
      
      
    }
    
    
    
    )
    
    const mediaArray = Array.from(allMedia);
    rightArrow.addEventListener("click", () => {
      const currentMediaIndex = mediaArray.indexOf(oneMedia);
      if (currentMediaIndex < mediaArray.length - 1) {
        console.log(currentMediaIndex + 1);
        console.log(currentMediaIndex);
        console.log(mediaArray.indexOf(oneMedia));
        console.log(mediaArray.length - 1);
        centralImage.src = mediaArray[currentMediaIndex +1].src;
      } else {
        centralImage.src = mediaArray[0].src;
      }
    });
  }
}
setTimeout(constructSlider, 1000);