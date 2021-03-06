export const listElements = document.querySelector(".elements");

export const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(".profile__description");
export const profileAvatar = profile.querySelector(".profile__avatar");

export const popupEdit = document.querySelector(".popup_type_edit");
export const nameInput = popupEdit.querySelector(".popup__input_edit_name");
export const descriptionInput = popupEdit.querySelector(".popup__input_edit_description");
export const popupEditSubmitBtn = popupEdit.querySelector('[type="submit"]')


export const popupPlace = document.querySelector(".popup_type_place");
export const popupPlaceSubmitBtn = popupPlace.querySelector('[type="submit"]');

export const popupImage = document.querySelector(".popup_type_picture");

export const popupDelete = document.querySelector(".popup_type_delete-card");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupAvatarSubmitBtn = popupAvatar.querySelector('[type="submit"]')




export const data = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active',
  errorUnderline: 'popup__input-underline'
};

