class mediaFactory {
  constructor(data) {
    const { title, image, video, likes, id, photographerId, artist, date } = data;
    this.title            = title;
    this.artist           = artist;
    this.picture          = image
      ? `medias/${artist}/${image}`
      : `medias/${artist}/${video}`;
    this.likes            = likes;
    this.id               = id;
    this.photographerId   = photographerId;
    this.video            = video;
    this.date             = date;
    // console.log(emptyArray.sort((a, b) => a.title > b.title));
    // console.log(emptyArray.sort((a, b) => a.likes < b.likes));
    // console.log(emptyArray.sort((a, b) => a.date < b.date));
    const selectTitleOption = document.querySelector(".select__title");
  //   selectTitleOption.addEventListener("click", () => {
  //     emptyArray.sort((a, b) => a.title > b.title);
  //     console.log(emptyArray);
  //     console.log(mediaSection);
  // })


}; 

  getuserGalleryCard() {

    if(this.picture.includes('mp4')){this.picture = this.picture.replace("mp4", "png");}

    const article = document.createElement("article");
    article.setAttribute("tabindex", "0");
    article.setAttribute("title", `${this.title}`);
    article.setAttribute("date", `${this.date}`);
    article.setAttribute("likes", `${this.likes}`);
    article.innerHTML = `
      <img src="${this.picture}" alt="${this.title} by ${this.artist}" class="artist__media" title="${this.title}" loading ="lazy">
      <header> 
      <h2 class="media__title">${this.title}</h2>
      <div class="media__likes">
      <p class="likesNumber">${this.likes}</p>
      <i class="fas fa-heart heart__media"></i>
      </div>
      </header>
      `
    return article;
  }
}