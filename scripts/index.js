const popupOpenButtonElement = document.querySelector('.profile__button-edit')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')

const openPopup = function() {
  popupElement.classList.add('popup_is-opened')
}
  
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened')
}

const closePopupByClickOnOverlay = function(event) {
    if (event.target !== event.currentTarget) {
      return
    }
    closePopup()
  }

popupOpenButtonElement.addEventListener('click', openPopup)
popupCloseButtonElement.addEventListener('click', closePopup)
popupElement.addEventListener('click', closePopupByClickOnOverlay)

const formElement = document.querySelector('.popup__content')

let profileName = document.querySelector('.profile__name')  
let profileDescription = document.querySelector('.profile__description')

let nameInput = document.querySelector('.popup__input_name')
let descriptionInput = document.querySelector('.popup__input_description')

function popupSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value
    let descriptionValue = descriptionInput.value
    profileName.innerHTML = `<h2 class="profile__name">${nameValue}</h2>`
    profileDescription.innerHTML = `<p class="profile__description">${descriptionValue}</p>`
    closePopup()
}

formElement.addEventListener('submit', popupSubmitHandler)

function likeClick(event) {
  event.preventDefault()
  event.currentTarget.classList.toggle('element__like_active')
}

let likeBtns= document.querySelectorAll('.element__like')