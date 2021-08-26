class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._title = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._handleCardClick = handleCardClick;
    }

    createCard(){
       this._cardElement = this._getTemplate();
       this._cardElement.querySelector(".element__text").textContent = this._title;
       this._cardElement.querySelector(".element__image").src = this._link;
       this._cardElement.querySelector(".element__image").alt = this._title;
          
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
      
    _handleLike(event) {
        const likeButton = event.target.closest(".element__like");
        likeButton.classList.toggle("element__like_active");
    }

    _setEventListeners() {
        this._cardElement.querySelector(".element__image").addEventListener("click",() =>  this._handleCardClick());
        this._cardElement.querySelector(".element__trash").addEventListener("click", this._handleDelete);
        this._cardElement.querySelector(".element__like").addEventListener("click", this._handleLike);
    }
}

export {Card};