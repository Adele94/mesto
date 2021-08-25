export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

open() {
  this._popupSelector.classList.add('popup_is-opened');
  this._popupSelector.addEventListener('click', this._closePopupByClickOnOverlay);
  document.addEventListener('keydown', this._handleEscClose);
  this.setEventListeners();
}

close() {
  this._popupSelector.classList.remove('popup_is-opened');
  this._popupSelector.removeEventListener('click', this._closePopupByClickOnOverlay);
  document.removeEventListener('keydown',this._handleEscClose);
}


_closePopupByClickOnOverlay = (event) =>{
  if (event.target !== event.currentTarget) {
    return
  }
  this.close();
}

_handleEscClose = (event) => {
  if (event.code === 'Escape') {
   this.close();
  }
}

setEventListeners() {
  this._popupSelector.querySelector(".popup__close").addEventListener('click', () => this.close());
}

}