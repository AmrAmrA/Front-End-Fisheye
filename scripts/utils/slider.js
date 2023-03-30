function displaySlider() {
  // function to increase or decrease the number of likes
  likesContent();
  // function to move forward or backward on the number of slides
  const { allMedia, rightArrow, leftArrow } = slidesContent();
  // function to allow to move inside the slider with arrows
  function slidesContent() {
    const rightArrow = document.querySelector(".right__direction");
    const leftArrow = document.querySelector(".left__direction");
    const allMedia = document.querySelectorAll(".artist__media");
    return { allMedia, rightArrow, leftArrow };
  }
  // function to open the slider with a click or the key enter on the image
  for (const oneMedia of allMedia) {
    const mediaArray = Array.from(allMedia);
    oneMedia.addEventListener("click", (e) => {
      setupSlider(e);
    });
    oneMedia.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();               
        setupSlider(e);
      }
    });
  }

  function setupSlider(e) {
    const mediaArray = Array.from(allMedia);
    if (e.target.dataset.type == "video") {
    placeImage.innerHTML = `<video src="${e.target.src.replace('png', 'mp4')}" class="central__image" loading ="lazy" controls></video>`;}
    else {
      placeImage.innerHTML = `<img src="${e.target.src}" class="central__image" loading ="lazy">`;
    }
  
    let mediaIndex = mediaArray.indexOf(e.target);
    rightArrow.addEventListener("click", nextSlide);
    leftArrow.addEventListener("click", previousSlide);
    console.log(placeImage);
    openTheSlider();

    function nextSlide() {
       if (mediaIndex < mediaArray.length - 1 && e.target.dataset.type == "image") {
        placeImage.innerHTML = `<img src="${mediaArray[mediaIndex + 1].src}" class="central__image" loading ="lazy">`;
        mediaIndex++;
        console.log(mediaArray);
      }

      else {
        centralImage.src = mediaArray[0].src;
        mediaIndex = 0;
        return;

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
      if (event.keyCode == 39 || event.keyCode == 13) {
        nextSlide();
      } else if (event.keyCode == 37) {
        previousSlide();
      }
    }

    sliderBlock.addEventListener("keydown", arrowClick);
  }
}

setTimeout(displaySlider, 1000);        

// function to setup the increment of likes
function likesContent() {
  let heartMedia = document.querySelectorAll(".heart__media");
  const likesNumberMedia = document.querySelectorAll(".likesNumber");
  incrementLikes(heartMedia, likesNumberMedia);
}

// increment likes with mouse or the key enter
function incrementLikes(heartMedia, likesNumberMedia) {
  for (let i = 0; i < heartMedia.length; i++) {
    if (
      heartMedia[i].addEventListener("click", () => {
        if (!heartMedia[i].classList.contains("heart__toggle")) {
          return;
        }
        likesNumberMedia[i].textContent++;
        totalOfLikes.textContent++;
        heartMedia[i].classList.remove("heart__toggle");
      })
    );
    else if (
      heartMedia[i].addEventListener("keydown", (e) => {
        if (
          e.key !== "Enter" &&
          heartMedia[i].classList.contains("heart__toggle")
        ) {
          return;
        }
        likesNumberMedia[i].textContent++;
        totalOfLikes.textContent++;
        heartMedia[i].classList.remove("heart__toggle");
      })
    );
  }
}

// function to open the slider and hide the other elements
function openTheSlider() {
  sliderBlock.style.display = "block";
  mediaSection.style.display = "none";
  photographersSection.style.display = "none";
  pageHeader.style.display = "none";
  const dropDown = document.querySelector("#photo__sort");
  dropDown.style.display = "none";
  labelText.style.display = "none";
  const closeSlider = document.querySelector(".close__slider");
  closeSlider.addEventListener("click", closeTheSlider);
  body.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTheSlider();
    }
  });
}

// function to close the slider and show the other elements
function closeTheSlider() {
  sliderBlock.style.display = "none";
  mediaSection.style.display = "flex";
  photographersSection.style.display = "block";
  pageHeader.style.display = "flex";
  const dropDown = document.querySelector("#photo__sort");
  dropDown.style.display = "inline";
  labelText.style.display = "inline";
}
setTimeout(closeTheSlider, 1000);

// console.table(e.target.dataset.type)

// vérifier l'extension du fichier pour savoir si c'est une image ou une vidéo
// si c'est une image, on affiche l'image
// const image = `<img src="${e.target.src}" class="central__image" loading ="lazy">`;
// const video = `<video src="${mediaArray[mediaIndex + 1].src}" class="central__image" loading ="lazy" controls></video>`;
// si c'est une vidéo, on affiche la vidéo

// T'ancrer sur placeImage
// Remplacer complètement l'intérieur (innerHTML) de placeImage par une image
// Si ton e.target.dataset.type == "video" > Alors tu remplaces par une video
