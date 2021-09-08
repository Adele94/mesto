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
            valueList[input.name] = input.value;
        });
        return valueList;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', this.handleSubmit);
    }
    close() {
        super.close();
        this._popupSelector.querySelector(".popup__content").reset();
    }
}