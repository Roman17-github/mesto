const popupPhoto = document.querySelector(".popup_type_photo");
const popupImage = popupPhoto.querySelector(".popup__image");
const popupPhotoName = popupPhoto.querySelector(".popup__photoName");

import { openPopup } from "./index.js";

export default class Card {
  constructor(data, cardTemplate) {
    this._text = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._cardElement = this._cardTemplate
      .querySelector(".element")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".element__image");
  }

  createCard() {
    this._cardElement.querySelector(".element__name").textContent = this._text;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._link;
    this._setEventListeners();
    return this._cardElement;
  }

  _openPopupPhoto() {
    popupImage.src = this._link;
    popupImage.alt = this._text;
    popupPhotoName.textContent = this._text;
    openPopup(popupPhoto);
  }

  _likeCard(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _removeCard(evt) {
    evt.target.closest(".element").remove();
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openPopupPhoto();
      });

    this._cardElement
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._likeCard(evt);
      });

    this._cardElement
      .querySelector(".element__delete")
      .addEventListener("click", (evt) => {
        this._removeCard(evt);
      });
  }
}
