import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import "./index.css";
import Popup from "../components/Popup.js";

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

const PopupPhoto = new PopupWithImage(".popup_type_photo");
const popup = new Popup(".popup_type_delete");

function newCard(item) {
  const card = new Card(
    { item },
    "#template",
    () => {
      PopupPhoto.open(item);
    },
    () => {
      popup.setSubmitAction(() => {
        api
          .deleteCard(item._id)
      });
      popup.open();
    },
    () => {
      handleLikeClick(card);
    }
  );
  return card.createCard();
}

function handleLikeClick(card) {
  if (card._islikes) {
    api
      .likeAdd(card._cardID)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        card._likeInfo(res.likes);
      });
  } else {
    api
      .likeDelete(card._cardID)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        card._likeInfo(res.likes);
      });
  }
}

function renderLoading(isLoading, popupSubmit) {
  if (isLoading) {
    popupSubmit.textContent = "Сохранение...";
  } else {
    popupSubmit.textContent = "Сохранить";
  }
}

const formPlace = new PopupWithForm({
  popupSelector: ".popup_type_place",
  submitForm: (item) => {
    renderLoading(true, formPlace._submitFormButton);
    api
      .addCard(item)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        newCard(res);
        constants.elements.prepend(newCard(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formPlace._submitFormButton);
      });
  },
});

const userInfo = new UserInfo({
  userNameSelector: "profile__name",
  userSublineSelector: "profile__subline",
  UserAvatarSelector: "profile__image",
});

const formProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  submitForm: (input) => {
    renderLoading(true, formProfile._submitFormButton);
    api
      .setUserInfo(input)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formProfile._submitFormButton);
      });
  },
});

const formAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  submitForm: (input) => {
    renderLoading(true, formAvatar._submitFormButton);
    api
      .avatar(input)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, formAvatar._submitFormButton);
      });
  },
});

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

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "aaca6239-cac0-4a87-8d95-e01e56ac6f60",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .catch((err) => {
    console.log(err);
  })
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.setUserAvatar(res);
  });

api
  .getCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then((res) => {
    const cardList = new Section(
      {
        data: res,
        renderer: (item) => {
          newCard(item);
          cardList.addItem(newCard(item));
        },
      },
      constants.elements
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

PopupPhoto.setEventListeners();
formAvatar.setEventListeners();
formProfile.setEventListeners();
formPlace.setEventListeners();
formValidatorEdit.enableValidition();
formValidatorPlace.enableValidition();
formValidatorAvatar.enableValidition();
