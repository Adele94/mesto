import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
}
/*
setNewFormSubmit(newFunc) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    newFunc;
  };
  this._popupSelector.addEventListener('submit', handleFormSubmit);
}
*/
/*
setNewFormSubmit(cardID) {
  api.deleteCard(cardID)
.then(
  data => {
    console.log("Data 186"); 
    console.log(data); 
    card.handleDelete(event)
    deletePopup.close();
  })
  const handleFormSubmit = (event) => {
    event.preventDefault();
    newFunc;
  };
  this._popupSelector.addEventListener('submit', handleFormSubmit);
}
*/
setCardInfo(event) {
  this._event = event;
}

setEventListeners() {
  super.setEventListeners();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    this._handleDelete(
      {
        cardID: this._cardID, 
        event: this._event
      });
  };
  this._popupSelector.addEventListener('submit', handleFormSubmit);
}


handleDelete(event) {
  const itemElement = event.target.closest(".element");
  itemElement.remove();
}

open(cardID) {
  this._cardID = cardID; 
  this.setEventListeners();
  super.open();
}

}