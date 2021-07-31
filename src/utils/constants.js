
  export const config = {
    formSelector: ".form",
    inputSelector: ".popup__input",
    inputClassError: "popup__input_error",
    submitButton: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputTextError: ".form__error",
  };

  
  export const buttonOpenPopupPlace = document.querySelector(".profile__add-button");
  export const formPopupPlace = document.querySelector('[name="form-place"]');
  export const elements = document.querySelector(".elements");
  export const popupPhoto = document.querySelector(".popup_type_photo");
  export const buttonOpenPopupProfile = document.querySelector(".profile__edit");
  export const editFormProfile = document.querySelector('[name="form-edit"]');
  export const inputProfileName = editFormProfile.querySelector('[name="name"]');
  export const inputProfileSubline = editFormProfile.querySelector('[name="about"]');
  export const formPopupAvatar = document.querySelector('[name="form-avatar"]');
  export const buttonOpenPopupAvatar = document.querySelector(".profile__avatar_icon");
  