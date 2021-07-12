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

profile.querySelector(".profile__button-edit").addEventListener('click', openProfileModal);
profile.querySelector(".profile__button-add").addEventListener('click', () => openPopup(popupPlace));

popupEdit.querySelector(".popup__close").addEventListener('click', () => closePopup(popupEdit));
popupPlace.querySelector(".popup__close").addEventListener('click', () => closePopup(popupPlace));
popupImage.querySelector(".popup__close").addEventListener('click', () => closePopup(popupImage));

popupEdit.addEventListener('submit', handleSave);
popupPlace.addEventListener('submit', handleSubmit);

function setEventListeners(itemElement) {
  itemElement.querySelector(".element__image").addEventListener("click", openImagePopup);
  itemElement.querySelector(".element__trash").addEventListener("click", handleDelete);
  itemElement.querySelector(".element__like").addEventListener("click", handleLike);
}

function closePopup(modal) {
  modal.classList.remove('popup_is-opened');
}

function openPopup(modal) {
  modal.classList.add('popup_is-opened');
}

function openProfileModal() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}


function openImagePopup(event) {
  const element = popupImage.querySelector(".popup-content");
  element.querySelector(".popup__image-title").textContent = event.target.alt;
  element.querySelector(".popup__image").src = event.target.src;
  element.querySelector(".popup__image").alt = event.target.alt;
  element.querySelector(".popup__close").addEventListener("click", () => closePopup(popupImage));
  popupImage.classList.add("popup_is-opened");
}

function createCard(element){
  const card = elementTemplate.cloneNode(true);
  card.querySelector(".element__text").textContent = element.name;
  card.querySelector(".element__image").src = element.link;
  card.querySelector(".element__image").alt = element.name;
    
  setEventListeners(card);
  return card;
}

function renderCard(card) {
  listElements.prepend(card)
} 

function renderCards(initialCards){
  initialCards.forEach((item) => {
    renderCard(createCard(item));
  });
}

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
  renderCard(createCard(item));
  resetInput();
  closePopup(popupPlace);
}

function resetInput() {
  placeNameInput.value = "";
  placelinkInput.value = "";
}

function handleDelete(event) {
  const itemElement = event.target.closest(".element");

  itemElement.remove();
}

function handleLike(event) {
  const likeButton = event.target.closest(".element__like");
  likeButton.classList.toggle("element__like_active");
}

renderCards(initialCards);