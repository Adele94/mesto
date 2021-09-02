import '../pages/index.css';
import { listElements, profile, profileName, 
  profileDescription, popupEdit, nameInput, 
  descriptionInput, popupPlace, popupImage,popupDelete, data } from '../utils/constants.js';

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

//выводим информацию о профиле
api.getUserProfile()
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileUserID = result._id;
    getCards(result._id);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


function getCards(profileUserID){

api.getInitialCards()
.then((result) => {
  result.forEach(element => {
    initialCards.push(
      {
        name: element.name, 
        link: element.link,
        likes: element.likes,
        likesCount: element.likes.length,
        profileUserID: profileUserID,
        cardID: element._id
     })
      ;
  });
  
   cardList = new Section({
    items: initialCards,
    renderer: ({name, link, likes, cardID, profileUserID}) => {
      const cardElement = createNewCard({name, link, likes, cardID, profileUserID} );
      cardList.addItem(cardElement);
      }
    },
    listElements); 
  
    cardList.renderItems(); 

  })
  .catch((err) => {
    console.log(err); 
  });
  }
/* 
// рабочая версия старая
api.getUserProfile()
  .then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileUserID = result._id;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

let cardList; 
//выводим карточки
api.getInitialCards()
  .then((result) => {
    result.forEach(element => {
      initialCards.push(
        {
          name: element.name, 
          link: element.link,
          likes: element.likes,
          likesCount: element.likes.length,
          profileUserID: profileUserID,
          cardID: element._id
       })
        ;
    });
    
     cardList = new Section({
      items: initialCards,
      renderer: ({name, link, likes, cardID}, profileUserID) => {
        const cardElement = createNewCard({name, link, likes, cardID}, profileUserID);
        cardList.addItem(cardElement);
        }
      },
      listElements); 
    
      cardList.renderItems(); 

  })
  .catch((err) => {
    console.log(err); 
  });


*/
    //добавляем карточку
  const placePopup = new PopupWithForm(popupPlace, 
    (item) => {
      item['likes'] = [];
      item['profileUserID'] = profileUserID;
      const cardElement = createNewCard(item);
      cardList.addItem(cardElement);
      placePopup.close();
    
    //добавляем карточку
    api.addNewCard(item)
    .then(console.log(data))
    .catch((err) => {
      console.log(err); 
        });
      });

function openPlaceModal() {
  placePopup.open();
  cardValidation.resetValidation();
  }

profile.querySelector(".profile__button-add").addEventListener('click',  openPlaceModal);

const cardValidation = new FormValidator(data, document.querySelector('[name="place"]'));
const profileValidation = new FormValidator(data, document.querySelector('[name="edit"]'));

cardValidation.enableValidation();
profileValidation.enableValidation();

profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);

const imagePopup = new PopupWithImage(popupImage);
const deletePopup = new PopupDelete(popupDelete,
  () => {
    deletePopup.close();
     //удаляем карточку
     /*api.deleteCard(item)
     .then(data => {
       console.log(data); 
       deletePopup.close();
     })
     .catch((err) => {
       console.log(err); 
         });
         */
});

const profilePopup = new PopupWithForm(popupEdit, 
  (item) => {
    user.setUserInfo(item.name, item.description);

    //обновляем данные на  сервере
     //добавляем карточку
     api.updateUserProfile(item.name, item.description)
     .then(console.log(data))
     .catch((err) => {
       console.log(err); 
         });

    profilePopup.close();
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



function isLiked(likes){

}

function likeClick(cardID, isLiked) {
  if(isLiked)
  {
    api.addLikes(cardID)
    .then( (updatedCard) =>{
      console.log(updatedCard)
    }
    )
    .catch((err) => {
      console.log(err); 
    });
  }
  else{
    api.removeLikes(cardID)
    .then( (updatedCard) =>
      console.log(updatedCard)
    )
    .catch((err) => {
      console.log(err); 
    });
  }
}

function createNewCard({name, link, likes, cardID, profileUserID} ) {
  const card = new Card({name, link, likes , cardID, profileUserID}, '.element-template', { 
    handleCardClick: () => {
    imagePopup.open(name, link);
     },
     handleDeleteClick: () => {
       deletePopup.open();
       deletePopup.setNewFormSubmit(
        () => {
          api.deleteCard(item._id)
          .then(res =>{
            card.remove();
          });
        }
      )
    },
    handleLikeClick: (cardID, isLiked) => {
      likeClick(cardID, isLiked);
    }
  }); 
return card.createCard();  
}