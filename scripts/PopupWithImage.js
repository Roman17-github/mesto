import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
      constructor(popupSelector) {
          super(popupSelector);
          this._popupSelector = popupSelector;
          this._popupImage = this._popupSelector.querySelector(".popup__image");
          this._popupPhotoName = this._popupSelector.querySelector(".popup__photoName");
      }
    open( {name, link} ) {
        this._popupImage.src = link;
        this._popupPhotoName.textContent = name;
        super.open();
    }
}