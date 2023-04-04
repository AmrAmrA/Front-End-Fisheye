class onePhotographer {
  constructor(data) {
    const {
      name, tagline, city, country, id, portrait,
    } = data;
    this.name = name;
    this.tagline = tagline;
    this.location = `${city}, ${country}`;
    this.id = id;
    this.portrait = portrait;
  }

  getUserCardDOM() {
    // Creating DOM elements
    const article = document.querySelector('article');
    const buttonContact = document.querySelector('.header__button');
    const img = document.createElement('img');
    const taglinePhotographer = document.createElement('p');
    const locationPhotographer = document.createElement('p');
    locationPhotographer.classList.add('location');

    const seconddiv = document.createElement('div');
    seconddiv.classList.add('seconddiv');
    const thirddiv = document.createElement('div');
    thirddiv.classList.add('thirddiv');

    // Adding Content
    img.setAttribute('src', `assets/photographers/${this.portrait}`);
    taglinePhotographer.textContent = this.tagline;
    seconddiv.appendChild(buttonContact);
    seconddiv.setAttribute('tabindex', '-1');
    thirddiv.appendChild(img);
    thirddiv.setAttribute('tabindex', '0');

    article.innerHTML = `
      <div class="firstdiv" tabindex = "0">  
      <h1> ${this.name} </h1>
      <p class="location"> ${this.location} </p>
      <p> ${this.tagline} </p> </div>`;
    article.appendChild(seconddiv);
    article.appendChild(thirddiv);
    return article;
  }
}
