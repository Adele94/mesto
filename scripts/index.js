
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

const data = { 
  formSelector: '.popup__content', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save', 
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-error', 
  errorClass: 'popup__input-error_active' 
}; 

const cardValidation = new FormValidator(data, document.querySelector('[name="place"]'));
const profileValidation = new FormValidator(data, document.querySelector('[name="edit"]'));


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
  profileValidation.enableValidation(); 
}

function renderCard(cardElement) { 
  listElements.prepend(cardElement) 
}  

const renderCards = () => {
  listElements.innerHTML = '';
  initialCards.forEach((initialCard) => {
    const card = new Card(initialCard, elementTemplate);
    const cardElement = card.createCard();
    renderCard(cardElement);
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

  closePopup(popupPlace);
}

renderCards();