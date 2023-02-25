class onePhotographer{
    constructor(data) {
      const { name, tagline, city, country, id, portrait } = data;
      this.name = name;
      this.tagline = tagline;
      this.location = `${city}, ${country}`;
      this.id = id;
      this.portrait = portrait;
    }
  
    getUserCardDOM() {
      // Creating DOM elements
      const article = document.querySelector( 'article' );
      const buttonContart = document.querySelector( '.header__button' );
      const img = document.createElement( 'img' );
      const h1 = document.createElement( 'h1' );
      const taglinePhotographer = document.createElement( 'p' );
      const locationPhotographer = document.createElement( 'p' );
      locationPhotographer.classList.add('location');
     

      const firstdiv = document.createElement( 'div' ); 
      firstdiv.classList.add('firstdiv');
      const seconddiv = document.createElement( 'div' ); 
      seconddiv.classList.add('seconddiv');
      const thirddiv = document.createElement( 'div' );
      thirddiv.classList.add('thirddiv');
    
      // Adding Content
      locationPhotographer.textContent = this.location;
      h1.textContent = this.name;
      img.setAttribute("src", `assets/photographers/${this.portrait}`);
     
      taglinePhotographer.textContent = this.tagline;
      firstdiv.appendChild(h1);
      firstdiv.appendChild(locationPhotographer);
      firstdiv.appendChild(taglinePhotographer);
      seconddiv.appendChild(buttonContart);
      thirddiv.appendChild(img);

      article.appendChild(firstdiv);
      article.appendChild(seconddiv);
      article.appendChild(thirddiv);
      return article;
    }
  }