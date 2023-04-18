/* eslint-disable no-undef */
/* eslint-disable default-case */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const arraySort = [];

async function displayDataAndMedia() {
  const response = await fetch('data/photographers.json');
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}

displayDataAndMedia().then((data) => {
  const moneyDay = document.querySelector('.moneyDay');
  // Display the photographer's card header
  {
    // Tu peux utiliser un find
    const photographer = data.photographers.find(
      (photographer) => photographer.id == PhotographerId,
    );
    if (photographer) {
      const photographeModel = new PhotographerFactory(
        photographer,
        'onePhotographer',
      );
      const userCardDOM = photographeModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
      moneyDay.textContent = `${photographer.price}€/ jour`;
    }
  }
  // Display the photographer's gallery media
  const medias = data.media.filter(
    (media) => media.photographerId == PhotographerId,
  );
  for (const media of medias) {
    const mediaModel = new mediaFactory(media);
    const mediaCardDOM = mediaModel.getuserGalleryCard();
    mediaSection.appendChild(mediaCardDOM);

    const AllLikes = document.querySelectorAll('.likesNumber');
    let zero = 0;
    for (const allLike of AllLikes) {
      const total = (zero += parseInt(allLike.textContent));
      totalOfLikes.textContent = `${total}`;
    }
    arraySort.push(mediaCardDOM)
  }
  addSortListener()
});

function addSortListener() {
  const select = document.querySelector('#photo__sort');
  select.addEventListener('input', (event) => {
    const { value } = event.target;

    elements = document.querySelectorAll('section article');

    const sortedElements = Array.from(elements).sort((a, b) => {
      switch (value) {
        case 'title': 
          const nameA = a.getAttribute('title').toUpperCase();
          const nameB = b.getAttribute('title').toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          break;  
        case 'date':
          const dateA = a.getAttribute('date');
          const dateB = b.getAttribute('date');
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          break;
        case 'popularity':
          const likesA = parseInt(a.getAttribute('likes'));
          const likesB = parseInt(b.getAttribute('likes'));
          if (likesA > likesB) return -1;
          if (likesA < likesB) return 1;
          break; }
    })
    mediaSection.innerHTML = '';
    for (const element of sortedElements) {
      mediaSection.appendChild(element);
    }
  });
}
