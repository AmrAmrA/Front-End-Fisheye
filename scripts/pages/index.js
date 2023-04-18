// eslint-disable-next-line consistent-return
async function getPhotographers() {
  try {
    const response = await fetch('data/photographers.json');
    const photographers = await response.json();
    return photographers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = new PhotographerFactory(photographer, 'allPhotographers');
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
