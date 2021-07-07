
export default class FormValidator {
    constructor(config,formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._inputError = config.inputError;
        this._submitButton = config.submitButton;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputTextError = config.inputTextError;

    }
    enableValidition () {
      this._resetValidation(this._formElement);
      this._formElement.addEventListener('input',(evt) => this._handelFormInput(evt));
    }
      _handelFormInput (evt) {
        const input = evt.target;
        const form = evt.currentTarget;
        
        this._setFieldError(input);
        this._setSubmit(form);
      }

      _setFieldError(input) {
        const span = document.querySelector(`#${input.id}-error`);
        const valid = input.validity.valid;
        if (!valid) {
          input.classList.add(this._inputError );
          span.textContent = input.validationMessage;
          
        }else {
          input.classList.remove(this._inputError );
          span.textContent = ""
        }
      }

      _setSubmit(form) {
        const button = form.querySelector(this._submitButton);
        const isValid = form.checkValidity();

       if (isValid) {
         button.classList.remove(this._inactiveButtonClass);
         button.removeAttribute('disabled');
       }else {
         button.classList.add(this._inactiveButtonClass);
         button.setAttribute('disabled', 'disabled');
    }
  }

      _resetValidation (form) {
    const button = form.querySelector(this._submitButton);
    const span = form.querySelectorAll(this._inputTextError);
    const input = form.querySelectorAll(this._inputSelector);
    span.forEach((span) => {
     span.textContent = "";
    })
   
    input.forEach((input) => {
     input.classList.remove(this._inputError);
    })
 
     button.classList.add(this._inactiveButtonClass);
     button.setAttribute('disabled', 'disabled');
   }//функция очистки ошибок
}