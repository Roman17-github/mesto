const popupPhoto = document.querySelector(".popup_type_photo");
const popupImage = popupPhoto.querySelector(".popup__image");
const popupPhotoName = popupPhoto.querySelector(".popup__photoName");


export default class Card {
  constructor({ item,handleCardClick }, cardTemplate) {
    this._text = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
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
        this._handleCardClick();
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
