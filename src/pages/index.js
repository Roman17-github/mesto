import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithFormSubmit from "../components/PopupWithFormSubmit";
import "./index.css";

let userId = null;

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "aaca6239-cac0-4a87-8d95-e01e56ac6f60",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userNameSelector: "profile__name",
  userSublineSelector: "profile__subline",
  UserAvatarSelector: "profile__image",
});

const formValidatorEdit = new FormValidator(
  constants.config,
  constants.editFormProfile
);

const formValidatorPlace = new FormValidator(
  constants.config,
  constants.formPopupPlace
);

const formValidatorAvatar = new FormValidator(
  constants.config,
  constants.formPopupAvatar
);

const section = new Section(
  {
    renderer: (item) => {
      section.addItem(newCard(item));
    },
  },
  constants.elements
);

const formPlace = new PopupWithForm({
  popupSelector: ".popup_type_place",
  submitForm: (item) => {
    formPlace.renderLoading(true);
    api
      .addCard(item)
      .then((res) => {
        section.prependItem(newCard(res));
        formPlace.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPlace.renderLoading(false);
      });
  },
});

const formProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  submitForm: (input) => {
    formProfile.renderLoading(true);
    api
      .setUserInfo(input)
      .then((res) => {
        userInfo.setUserInfo(res);
        formProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formProfile.renderLoading(false);
      });
  },
});

const formAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitForm: (input) => {
    formAvatar.renderLoading(true);
    api
      .avatar(input)
      .then((res) => {
        userInfo.setUserAvatar(res);
        formAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAvatar.renderLoading(false);
      });
  },
});

const popupPhoto = new PopupWithImage(".popup_type_photo");
const confirmationPopup = new PopupWithFormSubmit(".popup_type_delete");

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

function newCard(item) {
  const card = new Card(
    { item },
    "#template",
    () => {
      popupPhoto.open(item);
    },
    () => {
      confirmationPopup.setSubmitAction(() => {
        api
          .deleteCard(item._id)
          .then(() => {
            confirmationPopup.close();
            card.removeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      confirmationPopup.open();
    },
    () => {
      handleLikeClick(card);
    },
    userId
  );
  return card.createCard();
}

function handleLikeClick(card) {
  if (card.islikes) {
    api
      .likeAdd(card.cardID)
      .then((res) => {
        card.likeInfo(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeDelete(card.cardID)
      .then((res) => {
        card.likeInfo(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

constants.buttonOpenPopupPlace.addEventListener("click", function () {
  formValidatorPlace.resetValidation();
  formPlace.open();
});

constants.buttonOpenPopupProfile.addEventListener("click", function () {
  formProfile.open();
  formValidatorEdit.resetValidation();
  const { name, about } = userInfo.getUserInfo();
  constants.inputProfileName.value = name;
  constants.inputProfileSubline.value = about;
});

constants.buttonOpenPopupAvatar.addEventListener("click", () => {
  formAvatar.open();
  formValidatorAvatar.resetValidation();
});

popupPhoto.setEventListeners();
formAvatar.setEventListeners();
formProfile.setEventListeners();
formPlace.setEventListeners();
confirmationPopup.setEventListeners();
formValidatorEdit.enableValidition();
formValidatorPlace.enableValidition();
formValidatorAvatar.enableValidition();
