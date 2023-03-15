let arraytitles = [];
let arrayDates = [];
let arrayLikes = [];

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

      // gathering the media by alphabetical order in an array
      arraytitles.push(mediaCardDOM);
      arraytitles.sort((a, b) => a.title > b.title);

      // Display the media by alphabetical order in the dom
      optionTitle.addEventListener("click", () => {
        for (let i = 0; i < arraytitles.length; i++) {
          mediaSection.appendChild(arraytitles[i]);
        }
      });
      // gathering the media by date in an array
      arrayDates.push(mediaCardDOM);
      // Display the media by date in the dom
      optionDate.addEventListener("click", () => {
        for (let i = 0; i < arrayDates.length; i++) {
          parseInt(arrayDates[i].getAttribute("date"));
          arrayDates.sort( (a, b) => parseInt(a.getAttribute("date")) > parseInt(b.getAttribute("date")) );
          mediaSection.appendChild(arrayDates[i]);
        }
      });

      // gathering the media by likes in an array
      arrayLikes.push(mediaCardDOM);
      // Display the media by likes in the dom
      optionLikes.addEventListener("click", () => {
        for (let i = 0; i < arrayLikes.length; i++) {
          parseInt(arrayLikes[i].getAttribute("likes"));
          arrayLikes.sort(
            (a, b) =>
              parseInt(a.getAttribute("likes")) <
              parseInt(b.getAttribute("likes"))
          );
          mediaSection.appendChild(arrayLikes[i]);
        }
      });
    }
    const AllLikes = document.querySelectorAll(".likesNumber");
    let zero = 0;
    for (let i = 0; i < AllLikes.length; i++) {
      let total = (zero += parseInt(AllLikes[i].textContent));
      totalOfLikes.textContent = `${total}`;
    }
  }
});
