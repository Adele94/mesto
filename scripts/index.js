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

let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileDescription = profile.querySelector(".profile__description");

const popupEdit = document.querySelector(".popup_type_edit");
let nameInput = popupEdit.querySelector(".popup__input_edit_name");
let descriptionInput = popupEdit.querySelector(".popup__input_edit_description");

const popupPlace = document.querySelector(".popup_type_place");
let placeNameInput = popupPlace.querySelector(".popup__input_place_name");
let placelinkInput = popupPlace.querySelector(".popup__input_place_link");

const popupImage = document.querySelector(".popup_type_picture");

profile.querySelector(".profile__button-edit").addEventListener('click', openEditPopup);
profile.querySelector(".profile__button-add").addEventListener('click', openPlacePopup);

popupEdit.querySelector(".popup__close").addEventListener('click', closePopup);
popupPlace.querySelector(".popup__close").addEventListener('click', closePopup);
popupImage.querySelector(".popup__close").addEventListener('click', closePopup);

popupEdit.addEventListener('submit', handleSave);
popupPlace.addEventListener('submit', handleSubmit);

function setEventListeners(itemElement) {
  itemElement.querySelector(".element__image").addEventListener("click", openImagePopup);
  itemElement.querySelector(".element__trash").addEventListener("click", handleDelete);
  itemElement.querySelector(".element__like").addEventListener("click", handleLike);
}

function closePopup(event) {
  event.target.closest(".popup").classList.remove('popup_is-opened');
}

function openPlacePopup() {
  popupPlace.classList.add('popup_is-opened');
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  popupEdit.classList.add('popup_is-opened');
}

function openImagePopup(event) {
  const element = popupImage.querySelector(".popup-content");
  element.querySelector(".popup__image-title").textContent = event.target.alt;
  element.querySelector(".popup__image").src = event.target.src;
  element.querySelector(".popup__image").alt = event.target.alt;
  element.querySelector(".popup__close").addEventListener("click", closePopup);
  popupImage.classList.add("popup_is-opened");
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
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(evt);
}

function handleSubmit(evt) {
  evt.preventDefault();
  const item  = {
    name: placeNameInput.value, 
    link: placelinkInput.value
  };
  renderCard(item);
  placeNameInput.value = "";
  placelinkInput.value = "";
  closePopup(evt);
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

renderCards(initialCards);