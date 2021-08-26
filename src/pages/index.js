
import '../pages/index.css';
import { listElements, profile, profileName, 
  profileDescription, popupEdit, nameInput, 
  descriptionInput, popupPlace, popupImage, data } from '../utils/constants.js';
import HongKong from '../images/Hong-Kong.jpg'
import China from '../images/China.png'
import Japan from '../images/Japan.jpg'
import Italy from '../images/Italy.jpg'
import Germany from '../images/Germany.jpg'
import Netherlands from '../images/Netherlands.jpg'

import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';

import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';

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

const cardValidation = new FormValidator(data, document.querySelector('[name="place"]'));
const profileValidation = new FormValidator(data, document.querySelector('[name="edit"]'));

cardValidation.enableValidation();
profileValidation.enableValidation();

profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
profile.querySelector(".profile__button-add").addEventListener('click',  openPlaceModal);

const imagePopup = new PopupWithImage(popupImage);

const profilePopup = new PopupWithForm(popupEdit, 
  (item) => {
    user.setUserInfo(item.name, item.description);
    profilePopup.close();
});

const placePopup = new PopupWithForm(popupPlace, 
  (item) => {
    const cardElement = createNewCard(item);
    cardList.addItem(cardElement);

  placePopup.close();
  });

const userData = {
  name: profile.querySelector(".profile__name"),
  description: profile.querySelector(".profile__description")

}
const user = new UserInfo(userData);

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

function createNewCard({name, link}) {
  const card = new Card({name, link}, '.element-template', () => {
    imagePopup.open(name, link);
  }); 
return card.createCard();  
}

const cardList = new Section({
  items: initialCards,
  renderer: ({name, link}) => {
    const cardElement = createNewCard({name,link});
    cardList.addItem(cardElement);
    }
  },
  listElements); 

  cardList.renderItems(); 