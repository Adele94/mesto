import '../pages/index.css';
import { listElements, profile, profileName, 
  profileDescription, profileAvatar, popupEdit, nameInput, 
  descriptionInput, popupPlace, popupImage,popupDelete, popupAvatar, data } from '../utils/constants.js';

import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupDelete from '../scripts/PopupDelete.js';

import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';
import Api from '../scripts/Api.js';

const initialCards = []; 

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'c38fc67e-bfd7-4e8c-84be-5445e5cdf811',
    'Content-Type': 'application/json'
  }
}); 

let profileUserID  ='';

let cardList; 

// Инициализация профиля и начальных карточек
Promise.all([api.getUserProfile(),api.getInitialCards()])
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
        likesCount: element.likes.length,
        ownerID: element.owner._id,
        profileUserID: profileUserID,
        cardID: element._id
     })
      ;
  });
  
   cardList = new Section({
    items: initialCards,
    renderer: ({name, link, likes, cardID, ownerID, profileUserID}) => {
      const cardElement = createNewCard({name, link, likes, cardID, ownerID, profileUserID} );
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
      item['likes'] = [];
      item['ownerID'] = profileUserID;
      item['profileUserID'] = profileUserID;
      popupPlace.querySelector('[type="submit"]').textContent = "Карточка создается...";

    //добавляем карточку
    api.addNewCard(item)
    .then( () => {
      popupPlace.querySelector('[type="submit"]').textContent = "Создать";
      const cardElement = createNewCard(item);
      cardList.addItem(cardElement);
      placePopup.close();
    })
    .catch((err) => {
      console.log(err); 
    })
  });

  //обновляем аватар
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
  const deletePopup = new PopupDelete(popupDelete);
  /*(cardID) => {
    api.deleteCard(cardID)
    .then(data => console.log(data));
  });*/

const cardValidation = new FormValidator(data, document.querySelector('[name="place"]'));
const profileValidation = new FormValidator(data, document.querySelector('[name="edit"]'));

cardValidation.enableValidation();
profileValidation.enableValidation();

profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
profile.querySelector(".profile__avatar-button").addEventListener('click',() => avatarPopup.open());
profile.querySelector(".profile__button-add").addEventListener('click',  openPlaceModal);

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

const userData = {
  name: profile.querySelector(".profile__name"),
  description: profile.querySelector(".profile__description")
}

const user = new UserInfo(userData);

function likeClick(cardID, isLiked) {
  if(isLiked)
  {
    api.addLikes(cardID)
    .then()
    .catch((err) => {
      console.log(err); 
    });
  }
  else{
    api.removeLikes(cardID)
    .then()
    .catch((err) => {
      console.log(err); 
    });
  }
}
/*       deletePopup.setNewFormSubmit(
        api.deleteCard(cardID)
        .then(
          data => {console.log(data); card.handleDelete()}) */
const aa =  function a(){
  api.deleteCard(cardID)
  .then(
    data => {console.log(data); card.handleDelete()})
}
  

// Создание и отображение карточки 
function createNewCard({name, link, likes, cardID, ownerID, profileUserID} ) {
  const card = new Card({name, link, likes , cardID, ownerID, profileUserID}, '.element-template', { 
    handleCardClick: () => {
    imagePopup.open(name, link);
     },
     handleDeleteClick: () => {
       deletePopup.open(cardID);
       deletePopup.setNewFormSubmit(aa); 
    },
    handleLikeClick: (cardID, isLiked) => {
      likeClick(cardID, isLiked);
    }
  }); 
return card.createCard();  
}