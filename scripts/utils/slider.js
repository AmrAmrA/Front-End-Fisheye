let un = 1;
function displaySlider() {
  let heartMedia = document.querySelectorAll(".heart__media");
  let likesNumberMedia = document.querySelectorAll(".likesNumber");

  // for (let i = 0; i < heartMedia.length; i++) {
  //   heartMedia[i].addEventListener("click", () => {
  //     if (heartMedia[i].classList.toggle("liked")) {
  //       likesNumberMedia[i].textContent++;
  //       totalOfLikes.textContent++;
  //       console.log(heartMedia[i].classList);
  //       heartMedia[i].classList.remove("liked");
  //     } else {
  //       likesNumberMedia[i].textContent--;
  //       totalOfLikes.textContent--;
  //       console.log(heartMedia[i].classList);
  //     }
  //   });
  // }

  heartMedia.forEach((heart, index) => {
    heart.addEventListener("click", (e) => {
      if (e.target.nearestViewportElement.classList.contains("heart__toggle") && un == 1 ) {
        likesNumberMedia[index].textContent++;
        totalOfLikes.textContent++;
        un++;
      } else {
        likesNumberMedia[index].textContent--;
        totalOfLikes.textContent--;
        un--;
      }
    });
  });




  const rightArrow = document.querySelector(".right__direction");
  const leftArrow = document.querySelector(".left__direction");
  const allMedia = document.querySelectorAll(".artist__media");

  for (let oneMedia of allMedia) {
    const mediaArray = Array.from(allMedia);
    oneMedia.addEventListener("click", (e) => {
      centralImage.src = e.target.src;
      e.target.classList.remove("photo");
      let mediaIndex = mediaArray.indexOf(e.target);
      rightArrow.addEventListener("click", nextSlide);
      leftArrow.addEventListener("click", previousSlide);
      openTheSlider();

      function nextSlide() {
        if (mediaIndex < mediaArray.length - 1) {
          centralImage.src = mediaArray[mediaIndex + 1].src;
          mediaIndex++;
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
  body.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Enter") {
      closeTheSlider();
    }
  });
}

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