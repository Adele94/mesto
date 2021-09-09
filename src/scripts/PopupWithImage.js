import Popup from "./Popup.js";
/*
export default class PopupWithImage extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    this._element = this._popupSelector.querySelector(".popup-content");
    this._imageTitle = this._element.querySelector(".popup__image-title").textContent;
    this._imageSrc = this._element.querySelector(".popup__image").src;
    this._imageAlt = this._element.querySelector(".popup__image").alt

  }
  open(imageAlt,imageSrc) {

  }
}*/

export default class PopupWithImage extends Popup { 
 
  constructor(popupSelector) {
    super(popupSelector);
    this._element = this._popupSelector.querySelector(".popup-content");
    this._imageTitle = this._element.querySelector(".popup__image-title");
    this._image = this._element.querySelector(".popup__image");
  }

  open(imageAlt,imageSrc) { 
    const element = this._popupSelector.querySelector(".popup-content"); 
    this._imageTitle.textContent = imageAlt;
    this._image.src = imageSrc;
    this._image.alt = imageAlt;
    super.open();
  } 
} 