import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));

    }

    _getInputValues() {
        const valueList = {};
        this._inputList.forEach(input => {
            valueList[input.name]  = input.value;
        });
        return valueList;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this._handleFormSubmit);
    }
     
    close() {
        super.close();
        this._inputList.forEach(input => {
            input.value = "";
        });
        this._popupSelector.querySelector(".popup__content").reset();
    }
}