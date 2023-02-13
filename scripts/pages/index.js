    async function getPhotographers() {
        try {
            const response = await fetch("data/photographers.json");
            const photographers = await response.json();
            console.log(photographers);
            return photographers;

        } catch (error) {
            console.error(error);
            return; 
        }
    }

        async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            const photographerModel = new photographerFactory(photographer, 'allPhotographers');
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    

/* 

let PhotographerId = new URLSearchParams(window.location.search).get("id");
console.log(PhotographerId);

async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        const photographers = await response.json();
        console.log(photographers);
        return photographers;

    } catch (error) {
        console.error(error);
        return; 
    }
}





let photographersSection = document.querySelector(".photograph-header");


const photographeModel = new photographerFactory([PhotographerId]);
const userCardDOM = photographeModel.getUserCardDOM();
photographersSection.appendChild(userCardDOM);


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();




let PhotographerId = new URLSearchParams(window.location.search).get("id");
console.log(PhotographerId);

//Récupérer les données de l'API
const getPhotographer = async () => {
    const response = await fetch(`data/photographers.json`);
    const data = await response.json();
    const portfolio = 'salut'; 

        let photographerHeader = document.querySelector(".photograph-header");
        console.log(photographerHeader);    
     for (let i = 0; i < data.photographers.length; i++) {
         if (data.photographers[i].id == PhotographerId) {
                const { name, portrait, tagline, city, country, } = data.photographers[i];
                console.log(name);
                const picture = `assets/photographers/${portrait}`;
                const img = document.createElement( 'img' );
                img.setAttribute("src", picture)
                img.setAttribute("alt", name)
                const h2 = document.createElement( 'h2' );
                h2.textContent = name;
                const taglinePhotographer = document.createElement( 'p' );
                taglinePhotographer.textContent = tagline;
                const locationPhotographer = document.createElement( 'p' );
                locationPhotographer.textContent = `${city}, ${country}`;

                photographerHeader.appendChild(img);
                photographerHeader.appendChild(h2);
                photographerHeader.appendChild(taglinePhotographer);
                photographerHeader.appendChild(locationPhotographer);
                
         }
     }
    return data;
}
getPhotographer();

*/