const buttonOpenPopupProfile = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_type_edit");
const profileInfo = document.querySelector(".profile-info");
const editSave = document.querySelector('[name="form-edit"]');
const profileName = document.querySelector(".profile__name");
const profileSubline = document.querySelector(".profile__subline");
const inputProfileName = document.querySelector('[name="profile-name"]');
const inputProfileSubline = document.querySelector('[name="profile-subline"]');
const popups = document.querySelectorAll(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const buttonOpenPopupPlace = document.querySelector(".profile__add-button");
const formPopupPlace = document.querySelector('[name="form-place"]');
const inputPlaceName = document.querySelector('[name="place-name"]');
const inputPlaceSubline = document.querySelector('[name="place-subline"]');

 function openForm(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeEscPopup);
}

function closeForm(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeEscPopup);
}

export function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened');
    closeForm(openPopup);
  }
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSubline.textContent = inputProfileSubline.value;
  closeForm(popupEdit);
}

const config = {
  formSelector:'.form',
  inputSelector:'.popup__input',
  inputError:'popup__input_error',
  submitButton:'.popup__submit',
  inactiveButtonClass:'popup__submit_disabled',
  inputTextError:'.form__error'
}

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elements = document.querySelector(".elements");
const itemTemplate = document.querySelector("#template").content;
const htmlElement = itemTemplate.cloneNode(true);
const popupPhoto = document.querySelector(".popup_type_photo");

function renderElements() {
  initialCards.forEach((item) => {
     const card = new Card (item,itemTemplate).createCard();

     document.querySelector('.elements').prepend(card);
  })
}



renderElements();

buttonOpenPopupProfile.addEventListener("click", function () {
  openForm(popupEdit);
  inputProfileName.value = profileName.textContent;
  inputProfileSubline.value = profileSubline.textContent;
  new FormValidator (config,editSave).enableValidition ()
  
  
});

editSave.addEventListener("submit", editProfile);

buttonOpenPopupPlace.addEventListener("click", function () {
  openForm(popupPlace);
  new FormValidator (config,formPopupPlace).enableValidition ()
  formPopupPlace.reset();
});

formPopupPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    name: inputPlaceName.value,
    link: inputPlaceSubline.value,
  };
  const card = new Card (newCard,itemTemplate).createCard();
  document.querySelector('.elements').prepend(card);
  closeForm(popupPlace);
  evt.target.reset();
});

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) { 
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closeForm(popup);
    }
  });
})//функция закрытия всех попапов нажатием на крестик или оверлей

 






