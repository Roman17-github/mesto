import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";

const formValidatorEdit = new FormValidator(
  constants.config,
  constants.editFormProfile
);

const formValidatorPlace = new FormValidator(
  constants.config,
  constants.formPopupPlace
);

const PopupPhoto = new PopupWithImage(".popup_type_photo");

const cardList = new Section(
  {
    data: constants.initialCards,
    renderer: (item) => {
      newCard(item);
      cardList.addItem(newCard(item));
    },
  },
  constants.elements
);

function newCard(item) {
  const card = new Card({ item }, "#template", () => {
    PopupPhoto.open(item);
  });
  return card.createCard();
}

const formPlace = new PopupWithForm({
  popupSelector: ".popup_type_place",
  submitForm: (item) => {
    newCard(item);
    cardList.addItem(newCard(item));
  },
});

const userInfo = new UserInfo({
  userNameSelector: "profile__name",
  userSublineSelector: "profile__subline",
});

const formProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit",
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
