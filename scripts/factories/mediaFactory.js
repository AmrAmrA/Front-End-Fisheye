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
    const article = document.createElement("article");
    article.setAttribute("tabindex", "0");
    const img = document.createElement("img");
    const video = document.createElement("video");
    if (this._picture.includes("mp4")) {
      let changeMimeType = this._picture.replace("mp4", "png");
      img.setAttribute("src", changeMimeType);
      img.classList.add("artist__media");
    } else {
      img.setAttribute("src", this._picture);
      img.setAttribute("alt", `${this._title} by artist`);
      img.classList.add("artist__media");
    }
    const titleText   = document.createElement("h2");
    const likesText   = document.createElement("p");
    const mediaHeader = document.createElement("header");

    likesText.classList.add("likesNumber");
    // Adding Content
    titleText.textContent = this._title;
    likesText.textContent = this._likes;
    this._picture.includes("mp4")
      ? article.appendChild(img)
      : article.appendChild(img);
    mediaHeader.appendChild(titleText);
    mediaHeader.appendChild(likesText);
    article.appendChild(mediaHeader);
    return article;
  }

  getuserFooterCard() {
    const footer = document.createElement("footer");
  }
}
