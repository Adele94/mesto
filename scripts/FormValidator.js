class FormValidator {
    constructor(){

    }
    
   openProfileModal() {
        openPopup(popupEdit);
        nameInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
      
        const buttonSave = popupEdit.querySelector(".popup__save");
        buttonSave.setAttribute("disabled", false);
        buttonSave.classList.remove("popup__save_inactive");
      
        const popupInputSections = Array.from(popupEdit.querySelectorAll(".popup__input-section"));
        popupInputSections.forEach( (popupInputSection) => {
          popupInputSection.querySelector(".popup__input-error").classList.remove("popup__input-error_active");
          popupInputSection.querySelector(".popup__input").classList.remove("popup__input-underline");
        });
      }

      _setEventListeners() {
        const profile = document.querySelector(".profile");
        profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
      }
}

export {FormValidator};