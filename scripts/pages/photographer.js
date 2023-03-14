let tableau = [];
let tableauDates = [];
let tableauLikes = [];

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
      tableau.push(mediaCardDOM);
      tableau.sort((a, b) => a.title > b.title);
      
            optionTitle.addEventListener("click", () => {
              for (let i = 0; i < tableau.length; i++) {
                mediaSection.appendChild(tableau[i]);
              }
            });
      
      tableauDates.push(mediaCardDOM);
      tableauDates.sort((a, b) => a.date < b.date);
      
      optionDate.addEventListener("click", () => {
        for (let i = 0; i < tableauDates.length; i++) {
          mediaSection.appendChild(tableauDates[i]);
        }
      });


      tableauLikes.push(mediaCardDOM);
      optionLikes.addEventListener("click", () => {
      for (let i = 0; i < tableauLikes.length; i++) {
       parseInt(tableauLikes[i].getAttribute("likes"));
        tableauLikes.sort((a, b) => parseInt(a.getAttribute("likes")) < parseInt(b.getAttribute("likes")));
        mediaSection.appendChild((tableauLikes[i]));                                                                   
      }
    })}; 
    const AllLikes = document.querySelectorAll(".likesNumber");
    let zero = 0;
    for (let i = 0; i < AllLikes.length; i++) {
      let total = (zero += parseInt(AllLikes[i].textContent));
      totalOfLikes.textContent = `${total}`;
    }
  }
});
