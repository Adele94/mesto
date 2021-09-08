import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
  }

  setCardEvent(event) {
    this._event = event;
  }

  setEventListeners() {
    super.setEventListeners();
    const handleFormSubmit = (event) => {
      event.preventDefault();
      this._handleDelete(
        {
          cardID: this._cardID
        });
    };
    this._popupSelector.addEventListener('submit', handleFormSubmit);
  }

  handleDelete() {
    const itemElement = this._event.target.closest(".element");
    itemElement.remove();
  }

  open(cardID) {
    this._cardID = cardID;
    this.setEventListeners();
    super.open();
  }
}