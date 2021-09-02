import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
 }

    _handleSubmit = (event) => {
        event.preventDefault();
        this._handleFormSubmit();
      }
  
      setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._handleSubmit);
    }
    close() {
        super.close();
    }
}