    async function getPhotographers() {
        try {
            const response = await fetch("data/photographers.json");
            const photographers = await response.json();
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