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

const pageElement = document.querySelector(".page");

const popupElement = document.querySelector(".popup");
const popupElementContent = popupElement.content;
let popupTitle = popupElement.querySelector(".popup__title");
let popupSave = popupElement.querySelector(".popup__save");

const popupCloseButtonEditElement = popupElement.querySelector(".popup__close");
const formElement = popupElement.querySelector(".popup__content");

let nameInput = formElement.querySelector(".popup__input_bio_name");
let descriptionInput = formElement.querySelector(".popup__input_bio_description");


let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
const popupOpenButtonEditElement = document.querySelector(".profile__button-edit");
const popupOpenButtonAddElement = document.querySelector(".profile__button-add");

const openAddPopup = function() {
  nameInput.value = "";
  nameInput.placeholder = "Название"
  descriptionInput.value = "";
  descriptionInput.placeholder = "Ссылка на картинку";
  popupTitle.textContent = "Новое место";
  popupSave.textContent = "Создать";
  popupElement.classList.add('popup_is-opened');
}

const openEditPopup = function() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupTitle.textContent = "Редактировать профиль";
  popupSave.textContent = "Сохранить";
  popupElement.classList.add('popup_is-opened');
}
  
const closePopup = function() {
  popupElement.classList.remove("popup_is-opened");
}

popupOpenButtonEditElement.addEventListener('click', openEditPopup);
popupOpenButtonAddElement.addEventListener('click', openAddPopup);
popupCloseButtonEditElement.addEventListener('click', closePopup);

function popupSubmitHandler (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let descriptionValue = descriptionInput.value;

    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;
    closePopup();
}

formElement.addEventListener('submit', popupSubmitHandler);





