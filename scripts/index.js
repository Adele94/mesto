const popupOpenButtonElement = document.querySelector('.profile__button-edit')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')

const formElement = document.querySelector('.popup__content')

let profileName = document.querySelector('.profile__name')  
let profileDescription = document.querySelector('.profile__description')

let nameInput = document.querySelector('.popup__input_bio_name')
let descriptionInput = document.querySelector('.popup__input_bio_description')

const openPopup = function() {
  nameInput.value = profileName.textContent
  descriptionInput.value = profileDescription.textContent
  popupElement.classList.add('popup_is-opened')
}
  
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened')
}

popupOpenButtonElement.addEventListener('click', openPopup)
popupCloseButtonElement.addEventListener('click', closePopup)

function popupSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value
    let descriptionValue = descriptionInput.value

    profileName.textContent = nameValue
    profileDescription.textContent = descriptionValue
    closePopup()
}

formElement.addEventListener('submit', popupSubmitHandler)
