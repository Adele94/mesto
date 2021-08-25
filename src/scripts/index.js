
import '../pages/index.css';
import HongKong from '../images/Hong-Kong.jpg'
import China from '../images/China.png'
import Japan from '../images/Japan.jpg'
import Italy from '../images/Italy.jpg'
import Germany from '../images/Germany.jpg'
import Netherlands from '../images/Netherlands.jpg'

import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

import UserInfo from './UserInfo.js';
import Section from './Section.js';
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

let profilePopup = new PopupWithForm(popupEdit, 
  (evt) => {
    evt.preventDefault();
    user.setUserInfo(nameInput.value, descriptionInput.value)
    profilePopup.close();
});

let placePopup = new PopupWithForm(popupPlace, 
  (evt) => {
    evt.preventDefault();

  const item  = {
    name: placeNameInput.value,
    link: placelinkInput.value
  };
  const card = new Card(item, elementTemplate,  (imageScr, imageAlt) => {
    let imagePopup = new PopupWithImage(popupImage);
    imagePopup.open(imageScr, imageAlt);
  });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);

  placePopup.close();
  });

let userData = {
  name: profile.querySelector(".profile__name"),
  description: profile.querySelector(".profile__description")

}
let user = new UserInfo(userData);

function openProfileModal() {
  profilePopup.open();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileValidation.resetValidation();
}

function openPlaceModal() {
  placePopup.open();
  cardValidation.resetValidation();
}

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, elementTemplate, (imageScr, imageAlt) => {
      let imagePopup = new PopupWithImage(popupImage);
      imagePopup.open(imageScr, imageAlt);
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    }
  },
  listElements); 

  cardList.renderItems(); 