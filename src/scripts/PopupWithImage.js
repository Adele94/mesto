import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open(imageSrc, imageAlt) {
    const element = this._popupSelector.querySelector(".popup-content");
    element.querySelector(".popup__image-title").textContent = imageAlt;
    element.querySelector(".popup__image").src = imageSrc;
    element.querySelector(".popup__image").alt = imageAlt;
    super.open();
  }
}