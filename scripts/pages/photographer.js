let PhotographerId = new URLSearchParams(window.location.search).get("id");
console.log(PhotographerId);
async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        const photographers = await response.json();
        console.log(photographers.media[0].photographerId);
        return photographers;
        
    } catch (error) {
        console.error(error);
        return; 
    }
}


async function displayData(photographers) {

    let photographersSection = document.querySelector(".photograph-header");
    for (let photographPage of photographers) {
        if (photographPage.id == PhotographerId) {
    
            const photographeModel = new photographerFactory(photographPage, 'onePhotographer');
            const userCardDOM = photographeModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
          
        }
    }
}



async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
