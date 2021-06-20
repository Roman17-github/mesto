function enableValidition (config) {
    const form = document.querySelectorAll(config.formSelector);
     form.forEach((form) => {
      form.addEventListener('submit', handelFormSubmit);
      form.addEventListener('input',(evt) => handelFormInput(evt,config));
     })
  }
  
  function handelFormSubmit (evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const isValid = form.checkValidity();
  }
  
  function handelFormInput (evt,config) {
    const input = evt.target;
    const form = evt.currentTarget;

    setFieldError(input,config);
    setSubmit(form,config);
  }
  
  function setFieldError(input,config) {
    const span = document.querySelector(`#${input.id}-error`);
    const valid = input.validity.valid;
    if (!valid) {
      input.classList.add(config.inputError);
      span.textContent = input.validationMessage;
      
    }else {
      input.classList.remove(config.inputError);
      span.textContent = ""
    }
  }
  
  function setSubmit(form) {
    const button = form.querySelector(config.submitButton);
    const isValid = form.checkValidity();
  
    if (isValid) {
      button.classList.remove(config.inactiveButtonClass);
      button.removeAttribute('disabled');
    }else {
      button.classList.add(config.inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    }
  }
  
  function resetValidation (form) {
   const button = form.querySelectorAll(config.submitButton);
   const span = form.querySelectorAll(config.inputTextError);
   const input = form.querySelectorAll(config.inputSelector);
   span.forEach((span) => {
    span.textContent = "";
   })
  
   input.forEach((input) => {
    input.classList.remove(config.inputError);
   })

   button.forEach((button) => {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
   })
   
  }//функция очистки ошибок
  
  const config = {
    formSelector:'.form',
    inputSelector:'.popup__input',
    inputError:'popup__input_error',
    submitButton:'.popup__submit',
    inactiveButtonClass:'popup__submit_disabled',
    inputTextError:'.form__error'
  }
  
  enableValidition (config);
  