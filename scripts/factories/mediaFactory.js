class mediaFactory {
    constructor(data) {
        const { title, image, video, likes, id, photographerId } = data;
        this._title         = title;
        this._picture       = image ? `medias/${image}` : `medias/${video}`;
        this._likes         = likes;
        this._id            = id;
        this._photographerId = photographerId;
  
    }; 
    
    getuserGalleryCard(){
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        if (this._picture.includes("mp4")){
            img.setAttribute("src", "assets/images/placeholder.png")
        } else {
            img.setAttribute("src", this._picture)
            img.setAttribute("alt", "") 
        }
        const titleText = document.createElement('p'); 
        const likesText = document.createElement('p');
        const divHeader = document.createElement('div');
      
        // Adding Content
        titleText.textContent = this._title;
        likesText.textContent = this._likes;
        divHeader.appendChild(titleText);
        divHeader.appendChild(likesText);
        article.appendChild(divHeader);
        return article;
    }
   
}