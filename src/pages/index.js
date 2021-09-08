import '../pages/index.css';
import {
  listElements, profile, profileName,
  profileDescription, profileAvatar, popupEdit, nameInput,
  descriptionInput, popupPlace, popupImage, popupDelete, popupAvatar, data
} from '../utils/constants.js';

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
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
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
    popupPlace.querySelector('[type="submit"]').textContent = "Карточка создается...";
    api.addNewCard(item)
      .then((cardData) => {
        popupPlace.querySelector('[type="submit"]').textContent = "Создать";
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
    popupAvatar.querySelector('[type="submit"]').textContent = "Сохранение...";
    api.updateAvatarProfile(item.link)
      .then(
        (data) => {
          profileAvatar.src = data.avatar;
          popupAvatar.querySelector('[type="submit"]').textContent = "Сохранить";
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
    popupEdit.querySelector('[type="submit"]').textContent = "Сохранение...";
    //обновляем данные на  сервере
    api.updateUserProfile(item.name, item.description)
      .then(() => {
        user.setUserInfo(item.name, item.description);
        popupEdit.querySelector('[type="submit"]').textContent = "Сохранить";
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

function openProfileModal() {
  profilePopup.open();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileValidation.resetValidation();
}

const user = new UserInfo({
  name: profile.querySelector(".profile__name"),
  description: profile.querySelector(".profile__description")
});

//отправка запроса на установку/снятие лайка
function likeClick(cardID, isLiked) {
  if (isLiked) {
    api.renderLikes(cardID, 'PUT')
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.renderLikes(cardID,'DELETE')
      .catch((err) => {
        console.log(err);
      });
  }
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
      likeClick(cardData._id, isLiked);
    }
  });
  return card.createCard();
}