let arraytitles = [];
let arrayDates = [];
let arrayLikes = [];
const arraySort = []

// Ton tableau initial
// un tableau appelé par exemple arraySort <-- C'est celui ci que tu vas mettre à jour avec ton tri

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
    const photographer = data.photographers.find(photographer => photographer.id == PhotographerId)
    if(photographer) {
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
  const medias = data.media.filter(media => media.photographerId == PhotographerId)
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
  }

  const select = document.querySelector("#photo__sort");
  select.addEventListener("change", (event) => {
    const value = event.target.value;
    arraySort.push(...medias)
    switch (value) {
      case "title":
        arraySort.sort((a, b) => a.title > b.title);
        break;
      case "date":
        arraySort.sort((a, b) => parseInt(a.date) > parseInt(b.date));
        break;
      case "likes":
        arraySort.sort((a, b) => parseInt(a.likes) > parseInt(b.likes));
        break;
    }
    // Tu mets à jour ton DOM
    mediaSection.innerHTML = "";
    for (const element of arraySort) {
      mediaSection.appendChild(element);
    }
  });

  // for (const media of data.media) {
  //   if (media.photographerId == PhotographerId) {
  //     const mediaModel = new mediaFactory(media);
  //     const mediaCardDOM = mediaModel.getuserGalleryCard();
  //     mediaSection.appendChild(mediaCardDOM);

  //     // // gathering the media by alphabetical order in an array
  //     // arraytitles.push(mediaCardDOM);
  //     // arraytitles.sort((a, b) => a.title > b.title);

  //     // // Display the media by alphabetical order in the dom
  //     // optionTitle.addEventListener("click", () => {
  //     //   for (let i = 0; i < arraytitles.length; i++) {
  //     //     mediaSection.appendChild(arraytitles[i]);
  //     //   }
  //     // });
  //     // // gathering the media by date in an array
  //     // arrayDates.push(mediaCardDOM);
  //     // // Display the media by date in the dom
  //     // optionDate.addEventListener("click", () => {
  //     //   for (let i = 0; i < arrayDates.length; i++) {
  //     //     parseInt(arrayDates[i].getAttribute("date"));
  //     //     arrayDates.sort( (a, b) => parseInt(a.getAttribute("date")) > parseInt(b.getAttribute("date")) );
  //     //     mediaSection.appendChild(arrayDates[i]);
  //     //   }
  //     // });

  //     // // gathering the media by likes in an array
  //     // arrayLikes.push(mediaCardDOM);
  //     // // Display the media by likes in the dom
  //     // optionLikes.addEventListener("click", () => {
  //     //   for (let i = 0; i < arrayLikes.length; i++) {
  //     //     parseInt(arrayLikes[i].getAttribute("likes"));
  //     //     arrayLikes.sort(
  //     //       (a, b) =>
  //     //         parseInt(a.getAttribute("likes")) <
  //     //         parseInt(b.getAttribute("likes"))
  //     //     );
  //     //     mediaSection.appendChild(arrayLikes[i]);
  //     //   }
  //     // });
  //   }
  //   const AllLikes = document.querySelectorAll(".likesNumber");
  //   let zero = 0;
  //   for (let i = 0; i < AllLikes.length; i++) {
  //     let total = (zero += parseInt(AllLikes[i].textContent));
  //     totalOfLikes.textContent = `${total}`;
  //   }
  // }
});


/*
  Pour le tri :
    - Tu dois t'ancrer sur ton select
    - Tu y ajoutes un event listener sur le changement de valeur
    - Tu récupères la valeur du select

    Avec cette valeur, tu sais quelle opération de tri tu dois faire
    Tu effectues le tri et tu mets à jour ton tableau (du coup tu n'a qu'un seul tableau, arraySort)

    Par exemple pour l'approche :
     - Tu fais un switch pour faire le tri
     - en dehors du switch, après le switch, tu mets à jour tes medias dans le DOM
*/
