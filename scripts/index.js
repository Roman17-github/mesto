import { initialCards } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const config = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  inputClassError: "popup__input_error",
  submitButton: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputTextError: ".form__error",
};

const buttonOpenPopupProfile = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_type_edit");
const editFormProfile = document.querySelector('[name="form-edit"]');
const profileName = document.querySelector(".profile__name");
const profileSubline = document.querySelector(".profile__subline");
const inputProfileName = document.querySelector('[name="profile-name"]');
const inputProfileSubline = document.querySelector('[name="profile-subline"]');
const popups = document.querySelectorAll(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const buttonOpenPopupPlace = document.querySelector(".profile__add-button");
const formPopupPlace = document.querySelector('[name="form-place"]');
const inputPlaceName = document.querySelector('[name="place-name"]');
const inputPlaceLink = document.querySelector('[name="place-subline"]');
const itemTemplate = document.querySelector("#template").content;
const elements = document.querySelector(".elements");

const FormValidatorEdit = new FormValidator(config, editFormProfile);
const FormValidatorPlace = new FormValidator(config, formPopupPlace);

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSubline.textContent = inputProfileSubline.value;
  closePopup(popupEdit);
}

function addCard(data, cardTemplate) {
  const card = new Card(data, cardTemplate).createCard();
  elements.prepend(card);
}

function renderElements() {
  initialCards.forEach((item) => {
    addCard(item, itemTemplate);
  });
}

buttonOpenPopupProfile.addEventListener("click", function () {
  openPopup(popupEdit);
  FormValidatorEdit.resetValidation();
  inputProfileName.value = profileName.textContent;
  inputProfileSubline.value = profileSubline.textContent;
});

editFormProfile.addEventListener("submit", editProfile);

buttonOpenPopupPlace.addEventListener("click", function () {
  openPopup(popupPlace);
  formPopupPlace.reset();
  FormValidatorPlace.resetValidation();
});

formPopupPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  addCard(newCard, itemTemplate);
  closePopup(popupPlace);
});

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
}); //функция закрытия всех попапов нажатием на крестик или оверлей

renderElements();
FormValidatorEdit.enableValidition();
FormValidatorPlace.enableValidition();
