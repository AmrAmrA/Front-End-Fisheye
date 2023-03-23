const arraySort = [];

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
    // Tu peux utiliser un find
    const photographer = data.photographers.find(
      (photographer) => photographer.id == PhotographerId
    );
    if (photographer) {
      const photographeModel = new photographerFactory(
        photographer,
        "onePhotographer"
      );
      const userCardDOM = photographeModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
      moneyDay.textContent = `${photographer.price}€/ jour`;
    }
  }
  // Display the photographer's gallery media
  const medias = data.media.filter(
    (media) => media.photographerId == PhotographerId
  );
  for (const media of medias) {
    const mediaModel = new mediaFactory(media);
    const mediaCardDOM = mediaModel.getuserGalleryCard();
    mediaSection.appendChild(mediaCardDOM);

    const AllLikes = document.querySelectorAll(".likesNumber");
    let zero = 0;
    for (const allLike of AllLikes) {
      const total = (zero += parseInt(allLike.textContent));
      totalOfLikes.textContent = `${total}`;
    }

    const select = document.querySelector("#photo__sort");
    select.addEventListener("click", (event) => {
      const value = event.target.value;
      arraySort.push(mediaCardDOM);
      console.log(arraySort);
      switch (value) {
        case "title":
          arraySort.sort((a, b) => a.title > b.title);
          break;
        case "date":
          arraySort.sort(
            (a, b) =>
              parseInt(a.getAttribute("date")) >
              parseInt(b.getAttribute("date"))
          );
          break;
        case "popularity":
          arraySort.sort(
            (a, b) =>
              parseInt(a.getAttribute("likes")) <
              parseInt(b.getAttribute("likes"))
          );
          break;
      }
      // Tu mets à jour ton DOM
      mediaSection.innerHTML = "";
      for (const element of arraySort) {
        mediaSection.appendChild(element);
      }
    });
  }
});
