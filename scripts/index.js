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

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
const popupOpenButtonEditElement = document.querySelector(".profile__button-edit");
const popupOpenButtonAddElement = document.querySelector(".profile__button-add");

const popupElement = document.querySelector(".popup");
const popupCloseButtonEditElement = popupElement.querySelector(".popup__close");
let popupTitle = popupElement.querySelector(".popup__title");
const formElement = popupElement.querySelector(".popup__content");
let nameInput = formElement.querySelector(".popup__input_bio_name");
let descriptionInput = formElement.querySelector(".popup__input_bio_description");
let popupSave = popupElement.querySelector(".popup__save");

popupOpenButtonEditElement.addEventListener('click', openEditPopup);
popupOpenButtonAddElement.addEventListener('click', openAddPopup);
popupCloseButtonEditElement.addEventListener('click', closePopup);


function setEventListeners(itemElement) {
  itemElement.querySelector(".element__image").addEventListener("click", openImagePopup);
  itemElement.querySelector(".element__trash").addEventListener("click", handleDelete);
  itemElement.querySelector(".element__like").addEventListener("click", handleLike);
}

function closeImagePopup(event) {
  event.target.closest(".popup__type_image").classList.remove('popup_is-opened');
}

function openAddPopup() {
  nameInput.value = "";
  nameInput.placeholder = "Название"
  descriptionInput.value = "";
  descriptionInput.placeholder = "Ссылка на картинку";
  popupTitle.textContent = "Новое место";
  popupSave.textContent = "Создать";
  popupElement.classList.add('popup_is-opened');
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupTitle.textContent = "Редактировать профиль";
  popupSave.textContent = "Сохранить";
  popupElement.classList.add('popup_is-opened');
}

function openImagePopup(event) {
  const popupImage = document.querySelector(".popup__type_image");
  const element = popupImage.querySelector(".popup-temlate");
  element.querySelector(".popup__image-title").textContent = event.target.alt;
  element.querySelector(".popup__image").src = event.target.src;
  element.querySelector(".popup__image").alt = event.target.alt;
  element.querySelector(".popup__close").addEventListener("click", closeImagePopup);
  popupImage.classList.add("popup_is-opened");
}
  
function closePopup() {
  popupElement.classList.remove("popup_is-opened");
}

function renderCard(element){
  const listElements = document.querySelector(".elements");
  const elementTemplate = listElements.querySelector(".element-template").content;
  const elementCard = elementTemplate.cloneNode(true);
  elementCard.querySelector(".element__text").textContent = element.name;
  elementCard.querySelector(".element__image").src = element.link;
  elementCard.querySelector(".element__image").alt = element.name;
    
  setEventListeners(elementCard);
  listElements.prepend(elementCard)
}

function renderCards(initialCards){
  initialCards.forEach(renderCard);
}

function handleSave (evt) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}

function handleSubmit() {
  const item  = {
    name: nameInput.value, 
    link: descriptionInput.value
  };

  renderCard(item);
}

function handleDelete(event) {
  const itemElement = event.target.closest(".element");

  itemElement.remove();
}

function handleLike(event) {
  const itemElement = event.target.closest(".element");
  const likeButton = itemElement.querySelector(".element__like");
  likeButton.classList.toggle("element__like_active");
}

formElement.addEventListener('submit',(event) => {
  event.preventDefault();
  if (event.target.textContent.includes("Создать")) {
    handleSubmit();
  } else {
    handleSave();
  }
});

renderCards(initialCards);


