const popupImage = document.querySelector('.popup__image');
const popupPhoto = document.querySelector('.popup_type_photo');

import {closeEscPopup} from './index.js'

export default class Card {
    constructor(data,cardSelector) {
        this._text = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector
    }

    createCard () {
        
        this._cardElement = this._cardSelector.querySelector('.element').cloneNode(true);
        this._cardElement.querySelector(".element__name").textContent = this._text;
        this._cardElement.querySelector(".element__name").alt = this._text;
        this._cardElement.querySelector(".element__image").src = this._link; 
        this._setEventListeners();
        return this._cardElement
    }

    _openPopupPhoto() {
        popupImage.src = this._link;
        popupPhoto.classList.add('popup_opened');
        document.addEventListener('keydown', closeEscPopup);
      }

   _likeCard (evt) {
       evt.target.classList.toggle("element__like_active");
      }

   _removeCard (evt) {
       evt.target.closest(".element").remove();
      }

   _setEventListeners () {
        this._cardElement.querySelector(".element__image").addEventListener('click', () => {
            this._openPopupPhoto();
        })
        
        this._cardElement.querySelector(".element__like").addEventListener('click', (evt) => {
            this._likeCard (evt);
        })
        
        this._cardElement.querySelector(".element__delete").addEventListener('click', (evt) => {
            this._removeCard (evt);
        })
      }
}