class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._title = data.name;
        this._link = data.link;
        this._alt = data.name;
    }

    generateCard(elementTemplate){
       this._cardElement = elementTemplate.cloneNode(true);
       this._cardElement.querySelector(".element__text").textContent = this._title;
       this._cardElement.querySelector(".element__image").src = this._link;
       this._cardElement.querySelector(".element__image").alt = this._title;
          
       this._setEventListeners();
       return this._cardElement;
    }

    _openImagePopup(event) {
        const popupImage = document.querySelector(".popup_type_picture");
        const element = popupImage.querySelector(".popup-content");
        element.querySelector(".popup__image-title").textContent = event.target.alt;
        element.querySelector(".popup__image").src = event.target.src;
        element.querySelector(".popup__image").alt = event.target.alt;
        element.querySelector(".popup__close").addEventListener("click",  () => closePopup(popupImage));
        
        openPopup(popupImage); // надо импортнуть попап
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
        this._cardElement.querySelector(".element__image").addEventListener("click", this._openImagePopup);
        this._cardElement.querySelector(".element__trash").addEventListener("click", this._handleDelete);
        this._cardElement.querySelector(".element__like").addEventListener("click", this._handleLike);
    }
}

export {Card};