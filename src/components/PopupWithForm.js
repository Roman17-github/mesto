import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._submitFormButton = this._popupForm.querySelector(".popup__submit");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitFormButton.textContent = "Сохранение...";
    } else {
      this._submitFormButton.textContent = "Сохранить";
    }
  }
}
