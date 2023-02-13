class photographerFactory {
  constructor(data) {
    const { name, portrait, price, tagline, city, country, id } = data;
    this.picture = `assets/photographers/${portrait}`;
    this.name = name;
    this.price = price;
    this.tagline = tagline;
    this.location = `${city}, ${country}`;
    this.id = id;
  }

  getUserCardDOM() {
    // Creating DOM elements
    const article = document.createElement( 'article' );
    article.setAttribute('role', 'listitem');
    const img = document.createElement( 'img' );
    img.setAttribute("src", this.picture)
    img.setAttribute("alt", "") 
    const h2 = document.createElement( 'h2' );
    const pricePhotographer = document.createElement( 'p' );
    const taglinePhotographer = document.createElement( 'p' );
    const locationPhotographer = document.createElement( 'p' );
    const link = document.createElement( 'a' );
  
    // Adding Content
    locationPhotographer.textContent = this.location;
    h2.textContent = this.name;
    pricePhotographer.textContent = (`${this.price}€/jour`) ;
    taglinePhotographer.textContent = this.tagline;
    link.setAttribute("href", `photographer.html?id=${this.id}`);
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(taglinePhotographer);
    article.appendChild(pricePhotographer);
    article.appendChild(locationPhotographer);
    return article;
  }
}
