class mediaFactory {
  constructor(data) {
    const {
      title, image, video, likes, id, photographerId, artist, date,
    } = data;
    this.title = title;
    this.artist = artist;
    this.picture = image
      ? `medias/${artist}/${image}`
      : `medias/${artist}/${video}`;
    this.likes = likes;
    this.id = id;
    this.photographerId = photographerId;
    this.video = video;
    this.date = date;
  }

  getuserGalleryCard() {
    const article = document.createElement('article');
    this.type = 'image';
    if (this.picture.includes('mp4')) {
      this.picture = this.picture.replace('mp4', 'png');
      article.classList.add('video');
      this.type = 'video';
    }
    article.setAttribute('tabindex', '0');
    article.setAttribute('title', `${this.title}`);
    article.setAttribute('date', `${this.date}`);
    article.setAttribute('likes', `${this.likes}`);
    article.innerHTML = `
      <img src="${this.picture}" class="artist__media" title="${this.title}" alt = "${this.title}" data-type="${this.type}" tabindex = "0" loading ="lazy">
      <header> 
      <h2 class="media__title" tabindex = "0">${this.title}</h2>
      <div class="media__likes">
      <p class="likesNumber" tabindex = "0">${this.likes}</p>
      <i class="fas fa-heart heart__media heart__toggle" aria-label = "likes" tabindex = "0"></i>
      </div>
      </header>
      `;
    return article;
  }
}
