
import '../pages/index.css';
import HongKong from '../images/Hong-Kong.jpg'
import China from '../images/China.png'
import Japan from '../images/Japan.jpg'
import Italy from '../images/Italy.jpg'
import Germany from '../images/Germany.jpg'
import Netherlands from '../images/Netherlands.jpg'

import {openPopup, closePopup} from './Popup.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
    name: 'Китай, Гонк-Конг',
    link: HongKong
  },
  {
    name: 'Китай',
    link: China
  },
  {
    name: 'Япония',
    link: Japan
  },
  {
    name: 'Италия',
    link: Italy
  },
  {
    name: 'Германия',
    link: Germany
  },
  {
    name: 'Нидерланды',
    link: Netherlands
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
  errorClass: 'popup__input-error_active',
  errorUnderline: 'popup__input-underline'
}; 

const cardValidation = new FormValidator(data, document.querySelector('[name="place"]'));
const profileValidation = new FormValidator(data, document.querySelector('[name="edit"]'));


cardValidation.enableValidation(); 
profileValidation.enableValidation(); 


profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
profile.querySelector(".profile__button-add").addEventListener('click',  openPlaceModal);

popupEdit.querySelector(".popup__close").addEventListener('click', () => closePopup(popupEdit));
popupPlace.querySelector(".popup__close").addEventListener('click', () => closePopup(popupPlace));
popupImage.querySelector(".popup__close").addEventListener('click', () => closePopup(popupImage));


popupEdit.addEventListener('submit', handleSave);
popupPlace.addEventListener('submit', handleSubmit);



function openProfileModal() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileValidation.resetValidation();
}

function openPlaceModal() {
  openPopup(popupPlace); 
  placeNameInput.value = "";
  placelinkInput.value = "";
  cardValidation.resetValidation();
}

function renderCard(cardElement) { 
  listElements.prepend(cardElement) 
}  

function generateCard(data, template) {
  const card = new Card(data, template);
  return card.createCard();
}

const renderCards = () => {
  listElements.innerHTML = '';
  initialCards.forEach((initialCard) => {
    renderCard(generateCard(initialCard, elementTemplate));
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
  renderCard(generateCard(item, elementTemplate));
  
  popupPlace.querySelector(".popup__content").reset();

  closePopup(popupPlace);
}

renderCards();