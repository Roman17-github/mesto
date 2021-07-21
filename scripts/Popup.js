export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupCloseButton = this._popupSelector.querySelector('.popup__close');
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
          }
    }

    setEventListeners() {
        this._popupSelector.addEventListener("click",  (evt) => {
            if (
              evt.target.classList.contains("popup") ||
              evt.target.classList.contains("popup__close")
            ) {
                this.close();
            }
          });

          document.addEventListener('keydown', (evt) => {
              this._handleEscClose(evt);
          })
    }
}