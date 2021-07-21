import * as constants from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";

const formValidatorEdit = new FormValidator(
  constants.config,
  constants.editFormProfile
);
const formValidatorPlace = new FormValidator(
  constants.config,
  constants.formPopupPlace
);
const PopupPhoto = new PopupWithImage(constants.popupPhoto);
const cardList = new Section(
  {
    data: constants.initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          item,
          handleCardClick: () => {
            PopupPhoto.open(item);
          },
        },
        constants.itemTemplate
      ).createCard();
      cardList.addItem(card);
    },
  },
  constants.elements
);

const formPlace = new PopupWithForm({
  popupSelector: constants.popupPlace,
  submitForm: (item) => {
    const card = new Card(
      {
        item,
        handleCardClick: () => {
          PopupPhoto.open(item);
          PopupPhoto.setEventListeners();
        },
      },
      constants.itemTemplate
    ).createCard();
    cardList.addItem(card);
  },
});

const userInfo = new UserInfo({
  userNameSelector: "profile__name",
  userSublineSelector: "profile__subline",
});

const formProfile = new PopupWithForm({
  popupSelector: constants.popupEdit,
  submitForm: (input) => {
    userInfo.setUserInfo(input);
  },
});

constants.buttonOpenPopupPlace.addEventListener("click", function () {
  formValidatorPlace.resetValidation();
  formPlace.open();
});

constants.buttonOpenPopupProfile.addEventListener("click", function () {
  formProfile.open();
  formValidatorEdit.resetValidation();
  const { name, subline } = userInfo.getUserInfo();
  constants.inputProfileName.value = name;
  constants.inputProfileSubline.value = subline;
});

PopupPhoto.setEventListeners();
formProfile.setEventListeners();
formPlace.setEventListeners();
cardList.renderItems();
formValidatorEdit.enableValidition();
formValidatorPlace.enableValidition();
