class allPhotographers {
  constructor(data) {
    const {
      name, portrait, price, tagline, city, country, id,
    } = data;
    this.picture = `assets/photographers/${portrait}`;
    this.name = name;
    this.price = price;
    this.tagline = tagline;
    this.location = `${city}, ${country}`;
    this.id = id;
  }

  getUserCardDOM() {
    // Creating DOM elements
    const article = document.createElement('article');
    article.setAttribute('role', 'listitem');
    article.setAttribute('tabindex', '0');
    article.innerHTML = `
     <a href= photographer.html?id=${this.id}>
     <img src=${this.picture} alt="photo de ${this.name}">
     <h2>${this.name}</h2>
     </a>
     <p>${this.location}</p>
     <p>${this.tagline}</p>
     <p>${this.price}€/jour</p>`;
    return article;
  }
}
