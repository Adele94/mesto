class FormValidator {

  constructor(data, formElement) {
    this._form = formElement;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._errorUnderline = data.errorUnderline;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _getErrorMessage(inputElement) {
    const defaultErrorHandler = (inputElement) => inputElement.validationMessage;
    const urlErrorHandler = (inputElement) => {
      if (inputElement.validity.typeMismatch || inputElement.validity.valueMissing) {
        return inputElement.validationMessage;
      }
    };
    const errorHandlers = {
      url: urlErrorHandler,
      DEFAULT: defaultErrorHandler,
    };

    const inputName = inputElement.name;
    const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;

    return errorHandler(inputElement);
  };

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(inputElement);

      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement, errorMessage) {

    const errorElement = this._form.querySelector(`.${inputElement.name}-input-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._errorUnderline);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-input-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._errorUnderline);
  };

  _toggleButtonState() {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = this._inputList.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };

    this._form.addEventListener("submit", handleFormSubmit);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
      this._checkInputValidity(inputElement);
    })
    this._toggleButtonState();
  }
}

export { FormValidator };