import Popup from "./Popup.js";
/*
export default class PopupDelete extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
 }
  
    setEventListeners() {
      const handleFormSubmit = (event) => {
        event.preventDefault();
        this._handleFormSubmit(this.cardID);
      };
      super.setEventListeners();
      this._popupSelector.addEventListener('submit', handleFormSubmit);
    }

    open(cardID) {
      this.cardID = cardID; 
      super.open();
    }
}*/
export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
}

setNewFormSubmit(newFunc) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    newFunc();
  };
  this._popupSelector.addEventListener('submit', handleFormSubmit);

}

open(cardID) {
  this.cardID = cardID; 
  super.open();
}

}