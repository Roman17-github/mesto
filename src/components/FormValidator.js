export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._inputClassError = config.inputClassError;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputTextError = config.inputTextError;
    this._submitButton = this._formElement.querySelector(config.submitButton);
  }

  enableValidition() {
    this._formElement.addEventListener("input", (evt) =>
      this._handelFormInput(evt)
    );
  }

  _handelFormInput(evt) {
    const input = evt.target;
    const form = evt.currentTarget;

    this._setFieldError(input);
    this._toggleButtonSubmit(form);
  }

  _setFieldError(input) {
    const span = this._formElement.querySelector(`#${input.id}-error`);
    const valid = input.validity.valid;
    if (!valid) {
      input.classList.add(this._inputClassError);
      span.textContent = input.validationMessage;
    } else {
      input.classList.remove(this._inputClassError);
      span.textContent = "";
    }
  }

  _inactiveButtonSubmit() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "disabled");
  }

  _toggleButtonSubmit(form) {
    const isValid = form.checkValidity();
    if (isValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    } else {
      this._inactiveButtonSubmit();
    }
  }

  resetValidation() {
    const spans = this._formElement.querySelectorAll(this._inputTextError);
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    spans.forEach((span) => {
      span.textContent = "";
    });
    inputs.forEach((input) => {
      input.classList.remove(this._inputClassError);
    });
    this._inactiveButtonSubmit();
  } //функция очистки ошибок
}
