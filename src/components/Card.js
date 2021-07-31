export default class Card {
  constructor(
    { item },
    cardTemplate,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._text = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".element__image");
    this._likeCount = this._cardElement.querySelector(".element__like-count");
    this._likes = item.likes;
    this._isDelete = item.owner._id === "d9ae90f9cf436d2db082cf21";
    this._islikes = item.likes.some(
      (item) => item._id === "d9ae90f9cf436d2db082cf21"
    );
    this._cardID = item._id;
    this._deleteButton = this._cardElement.querySelector(".element__delete");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    if (!this._isDelete) {
      this._cardElement.removeChild(this._deleteButton);
    }

    this._cardElement.querySelector(".element__name").textContent = this._text;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._link;
    this._likeInfo(this._likes);
    this._setEventListeners();
    return this._cardElement;
  }

  _likeInfo(likes) {
    if (!this._islikes) {
      this._likeCount.textContent = likes.length;
      this._cardElement
        .querySelector(".element__like")
        .classList.remove("element__like_active");
      this._islikes = !this._islikes;
    } else {
      this._likeCount.textContent = likes.length;
      this._cardElement
        .querySelector(".element__like")
        .classList.add("element__like_active");
      this._islikes = !this._islikes;
    }
  }

  _setEventListeners() {
    
    this._cardImage.addEventListener("click", () => {
        this._handleCardClick();
      });

    this._cardElement
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
  }
}
