class mediaFactory {
  constructor(data) {
    const { title, image, video, likes, id, photographerId, artist } = data;
    this._title           = title;
    this._artist          = artist;
    this._picture         = image
      ? `medias/${artist}/${image}`
      : `medias/${artist}/${video}`;
    this._likes           = likes;
    this._id              = id;
    this._photographerId  = photographerId;
    this.video            = video;
  }

  getuserGalleryCard() {
    
    if(this._picture.includes('mp4')){this._picture = this._picture.replace("mp4", "png");}

    const article = document.createElement("article");
    article.setAttribute("tabindex", "0");
    article.innerHTML = `
    <div class="media__container">
      <img src="${this._picture}" alt="${this._title} by ${this._artist}" class="artist__media" title="${this._title}">
      <header> 
      <h2 class="media__title">${this._title}</h2>
      <div class="media__likes">
      <p class="likesNumber">${this._likes}</p>
      <i class="fas fa-heart heart__media"></i>
      </div>
      </header>
    </div>
      `
    return article;
  }
}