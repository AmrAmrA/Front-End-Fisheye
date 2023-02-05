function photographerFactory(data) {
    const { name, portrait, price, tagline, city, country, id } = data;

    const picture = `assets/photographers/${portrait}`;

    console.log(picture);
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name) 
        const h2 = document.createElement( 'h2' );
        const pricePhotographer = document.createElement( 'p' );
        const taglinePhotographer = document.createElement( 'p' );
        const locationPhotographer = document.createElement( 'p' );
        const link = document.createElement( 'a' );

        locationPhotographer.textContent = `${city}, ${country}`;
        h2.textContent = name;
        pricePhotographer.textContent = (`${price}€/jour`) ;
        taglinePhotographer.textContent = tagline;
        link.setAttribute("href", `photographer.html?id=${id}`);
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(taglinePhotographer);
        article.appendChild(pricePhotographer);
        article.appendChild(locationPhotographer);
        return article;
    }
    return { getUserCardDOM }
}
