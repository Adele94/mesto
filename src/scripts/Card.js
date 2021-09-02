
class Card {
    constructor(data, cardSelector, {handleCardClick, handleDeleteClick, handleLikeClick}) {
        this._cardSelector = cardSelector;
        this._title = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._likes = data.likes;
        this._likesCount = this._likes.length;
        //this._likesCount = data.likesCount;
        //this._userID  = userID;
        this._profileUserID = data.profileUserID;
        this._cardID  = data.cardID;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    createCard(){
       this._cardElement = this._getTemplate();
       this._cardElement.querySelector(".element__text").textContent = this._title;
       this._cardElement.querySelector(".element__image").src = this._link;
       this._cardElement.querySelector(".element__image").alt = this._title;
       
       this._likes.forEach(element => {
            if(element._id === this._profileUserID)
            this._cardElement.querySelector(".element__like").classList.add("element__like_active");
        });

       if(this._likesCount != 0) this._cardElement.querySelector(".element__like-count").textContent = this._likesCount;

       this._setEventListeners();
       return this._cardElement;
    }
     
    
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
      }

    _handleDelete(event) {
        const itemElement = event.target.closest(".element");
      
        itemElement.remove();
    }
      
    _handleLike = (event) =>  {
        
        const likeButton = event.target.closest(".element__like");

        //likeButton.classList.toggle("element__like_active");
        this._cardElement.querySelector(".element__like-count").textContent = this._likesCount + 1;
        this._handleLikeClick(this._cardID);
        
        if(likeButton.classList.contains("element__like_active"))
        {
            likeButton.classList.remove("element__like_active");
            this._likesCount-=1;
            this._cardElement.querySelector(".element__like-count").textContent = (this._likesCount!=0) ? this._likesCount : "" ;

            this._handleLikeClick(this._cardID, false);
        }
        else 
        {
            likeButton.classList.add("element__like_active");
            this._likesCount+=1;
            this._cardElement.querySelector(".element__like-count").textContent = this._likesCount;

            this._handleLikeClick(this._cardID, true);
        }
        
    }

    _setEventListeners() {
        this._cardElement.querySelector(".element__image").addEventListener("click",() =>  this._handleCardClick());
        this._cardElement.querySelector(".element__trash").addEventListener("click",() => this._handleDeleteClick()) // this._handleDelete);
        this._cardElement.querySelector(".element__like").addEventListener("click",this._handleLike) // this._handleDelete);

    }
}

export {Card};