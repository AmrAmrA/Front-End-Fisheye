
class mediaFactory {
    constructor(data) {
        const { title, image, video, likes, id, photographerId } = data;
        this._title         = title;
        this._picture       = image ? `medias/Ellie Rose/${image}` : `medias/Ellie Rose/${video}`;
        this._likes         = likes;
        this._id            = id;
        this._photographerId = photographerId;
        this.video          = video; 
  
    }; 
    
    getuserGalleryCard(){
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const video = document.createElement( 'video' );
        if (this._picture.includes("mp4")){
            video.setAttribute("width", "350");
            video.setAttribute("height", "250");
            video.setAttribute("controls", "controls");
            video.innerHTML = `<source src="${this._picture}" type="video/mp4">`
        } else {
            img.setAttribute("src", this._picture)
            img.setAttribute("alt", "") 
        }
        const titleText = document.createElement('p'); 
        const likesText = document.createElement('p');
        const mediaHeader = document.createElement('header');
      
        // Adding Content
        titleText.textContent = this._title;
        likesText.textContent = this._likes;
        this._picture.includes("mp4") ? article.appendChild(video) : article.appendChild(img);
        mediaHeader.appendChild(titleText);
        mediaHeader.appendChild(likesText);
        article.appendChild(mediaHeader);
        return article;
    }
   
}
