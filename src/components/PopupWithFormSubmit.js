import Popup from "./Popup";

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".form");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._action();
    });
    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._action = action;
  }
}
