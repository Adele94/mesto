class FormValidator {
    constructor(form, selectors){
      this.form = form;
      this.selectors = selectors;
    }

    enableValidation() {
      const formElements = document.querySelectorAll(this.form);
      const formList = Array.from(formElements);
      formList.forEach((formElement) => {
        this._setEventListeners(formElement);
      });
    }

    _getErrorMessage(inputElement){
      const defaultErrorHandler = (inputElement) => inputElement.validationMessage;
      const urlErrorHandler = (inputElement) => {
        if (inputElement.validity.typeMismatch) {
          return "Введите адрес сайта.";
        }
    
        if (inputElement.validity.valueMissing) {
          return "Вы пропустили это поле.";
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

    _showInputError(inputElement, errorMessage){
      const formSectionElement = inputElement.closest(".popup__input-section");
      const errorElement = formSectionElement.querySelector(".popup__input-error");
    
      errorElement.textContent = errorMessage;
      errorElement.classList.add("popup__input-error_active");
      inputElement.classList.add("popup__input-underline");
    };
    
    _hideInputError(inputElement){
      const formSectionElement = inputElement.closest(".popup__input-section");
      const errorElement = formSectionElement.querySelector(".popup__input-error");
    
      errorElement.textContent = "";
      errorElement.classList.remove("popup__input-error_active");
      inputElement.classList.remove("popup__input-underline");
    };

    _toggleButtonState(inputList, buttonElement){
      const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
      const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
    
      if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add("popup__save_inactive");
      } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("popup__save_inactive");
      }
    };

    _setEventListeners(formElement) {
      const handleFormSubmit = (event) => {
        event.preventDefault();
      };
      formElement.addEventListener("submit", handleFormSubmit);
    
      const inputList = Array.from(formElement.querySelectorAll(this.selectors));
      const buttonElement = formElement.querySelector(".popup__save");
    
      const inputListIterator = (inputElement) => {
        const handleInput = () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        };
    
        inputElement.addEventListener("input", handleInput);
      };
    
      inputList.forEach(inputListIterator);
    
      this._toggleButtonState(inputList, buttonElement);
    }
}

export {FormValidator};