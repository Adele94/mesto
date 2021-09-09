import '../pages/index.css';
import { listElements, profile, popupEdit, popupEditSubmitBtn, nameInput,
  descriptionInput, popupPlace, popupPlaceSubmitBtn, popupImage, popupDelete,
  popupAvatar, popupAvatarSubmitBtn, data } from '../utils/constants.js';

import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/PopupWithConfirmation.js';

import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Api from '../scripts/Api.js';

const initialCards = [];
let profileUserID = '';
let cardList;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'c38fc67e-bfd7-4e8c-84be-5445e5cdf811',
    'Content-Type': 'application/json'
  }
});

// Инициализация профиля и начальных карточек
Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then((result) => {
    const [userData, cardData] = result;
    user.setUserInfo(userData.name, userData.about, userData.avatar)
    profileUserID = userData._id;

    cardData.forEach(element => {
      initialCards.push(
        {
          name: element.name,
          link: element.link,
          likes: element.likes,
          owner: element.owner,
          _id: element._id
        })
        ;
    });

    cardList = new Section({
      items: initialCards,
      renderer: (cardData) => {
        const cardElement = createNewCard(cardData, profileUserID);
        cardList.addItem(cardElement);
      }
    },
      listElements);

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//добавляем новую карточку
const placePopup = new PopupWithForm(popupPlace,
  (item) => {
    popupPlaceSubmitBtn.textContent = "Карточка создается...";
    api.addNewCard(item)
      .then((cardData) => {
        popupPlaceSubmitBtn.textContent = "Создать";
        const cardElement = createNewCard(cardData, profileUserID);
        cardList.addItem(cardElement);
        placePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
  });

//popup обновления аватара
const avatarPopup = new PopupWithForm(popupAvatar,
  (item) => {
    popupAvatarSubmitBtn.textContent = "Сохранение...";
    api.updateAvatarProfile(item.link)
      .then(
        (data) => {
          user.setUserInfo(data.name, data.about, data.avatar);
          popupAvatarSubmitBtn.textContent = "Сохранить";
          avatarPopup.close();
        }
      )
      .catch((err) => {
        console.log(err);
      });
  });

//popup редактирования профиля
const profilePopup = new PopupWithForm(popupEdit,
  (item) => {
    popupEditSubmitBtn.textContent = "Сохранение...";
    //обновляем данные на  сервере
    api.updateUserProfile(item.name, item.description)
      .then((data) => {
        user.setUserInfo(data.name, data.about, data.avatar);
        popupEditSubmitBtn.textContent = "Сохранить";
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });

const imagePopup = new PopupWithImage(popupImage);

//popup удаления карточки
const deletePopup = new PopupWithConfirmation(popupDelete,
  ({cardID}) => {
    api.deleteCard(cardID)
      .then(
        () => {
          deletePopup.handleDelete();
          deletePopup.close();
        })
      .catch((err) => {
        console.log(err);
      });
  }
);

const cardValidation = new FormValidator(data, document.querySelector('[name="place"]'));
const profileValidation = new FormValidator(data, document.querySelector('[name="edit"]'));

cardValidation.enableValidation();
profileValidation.enableValidation();

profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
profile.querySelector(".profile__avatar-button").addEventListener('click', () => avatarPopup.open());
profile.querySelector(".profile__button-add").addEventListener('click', openPlaceModal);

function openPlaceModal() {
  placePopup.open();
  cardValidation.resetValidation();
}

const user = new UserInfo({
  name: profile.querySelector(".profile__name"),
  description: profile.querySelector(".profile__description")
});

function openProfileModal() {
  profilePopup.open();
  const {name, description}  = user.getUserInfo();
  nameInput.value = name.textContent; 
  descriptionInput.value = description.textContent; 
  profileValidation.resetValidation();
}

// Создание и отображение карточки 
function createNewCard(cardData, profileUserID) {
  const card = new Card(cardData, profileUserID, '.element-template', {
    handleCardClick: () => {
      imagePopup.open(cardData.name, cardData.link);
    },
    handleDeleteClick: (event) => {
      deletePopup.open(cardData._id);
      deletePopup.setCardEvent(event);
    },
    handleLikeClick: (isLiked) => {
      //отправка запроса на установку/снятие лайка
      if (!isLiked) {
       return api.renderLikes(cardData._id, 'PUT');
      }
      else {
       return api.renderLikes(cardData._id,'DELETE');
      }

    }
  });
  return card.createCard();
}