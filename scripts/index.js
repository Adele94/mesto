
import {openPopup, closePopup} from './Popup.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
    name: 'Китай, Гонк-Конг',
    link: './images/Hong-Kong.jpg'
  },
  {
    name: 'Китай',
    link: './images/China.jpg'
  },
  {
    name: 'Япония',
    link: './images/Japan.jpg'
  },
  {
    name: 'Италия',
    link: './images/Italy.jpg'
  },
  {
    name: 'Германия',
    link: './images/Germany.jpg'
  },
  {
    name: 'Нидерланды',
    link: './images/Netherlands.jpg'
  }
];

const listElements = document.querySelector(".elements");
const elementTemplate = listElements.querySelector(".element-template").content;

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const popupEdit = document.querySelector(".popup_type_edit");
const nameInput = popupEdit.querySelector(".popup__input_edit_name");
const descriptionInput = popupEdit.querySelector(".popup__input_edit_description");

const popupPlace = document.querySelector(".popup_type_place");
const placeNameInput = popupPlace.querySelector(".popup__input_place_name");
const placelinkInput = popupPlace.querySelector(".popup__input_place_link");

const popupImage = document.querySelector(".popup_type_picture");

const cardValidation = new FormValidator('.popup_type_place', '.popup__input');
const profileValidation = new FormValidator('.popup_type_edit', '.popup__input');

cardValidation.enableValidation(); 
profileValidation.enableValidation(); 


profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
profile.querySelector(".profile__button-add").addEventListener('click', () => { openPopup(popupPlace); cardValidation.resetValidation(); });

popupEdit.querySelector(".popup__close").addEventListener('click', () => closePopup(popupEdit));
popupPlace.querySelector(".popup__close").addEventListener('click', () => closePopup(popupPlace));
popupImage.querySelector(".popup__close").addEventListener('click', () => closePopup(popupImage));


popupEdit.addEventListener('submit', handleSave);
popupPlace.addEventListener('submit', handleSubmit);



function openProfileModal() {
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

const renderElements = () => {
  listElements.innerHTML = '';
  initialCards.forEach((initialCard) => {
    const card = new Card(initialCard,elementTemplate)

    const cardElement = card.createCard();
    listElements.prepend(cardElement);
  });
};

function handleSave (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupEdit);
}

function handleSubmit(evt) {
  evt.preventDefault();
  const item  = {
    name: placeNameInput.value, 
    link: placelinkInput.value
  };
  const card = new Card(item, elementTemplate);
  const cardElement = card.createCard();
  listElements.prepend(cardElement);

  popupPlace.querySelector(".popup__content").reset();

  const buttonSave = popupPlace.querySelector(".popup__save");
  buttonSave.setAttribute("disabled", true);
  buttonSave.classList.add("popup__save_inactive");

  closePopup(popupPlace);
}

renderElements();