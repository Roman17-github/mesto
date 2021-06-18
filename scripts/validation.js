function enableValidition () {
    const form1 = document.querySelector('.form[name="form-edit"]');
    form1.addEventListener('submit', handelFormSubmit);
    form1.addEventListener('input', handelFormInput);
  
    const form2 = document.querySelector('.form[name="form-place"]');
    form2.addEventListener('submit', handelFormSubmit);
    form2.addEventListener('input', handelFormInput);
  
  }
  function handelFormSubmit (evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const isValid = form.checkValidity();
  }
  
  function handelFormInput (evt) {
    const input = evt.target;
    const form = evt.currentTarget;
    
    setFieldError(input);
    setSubmit(form);
  }
  
  function setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
    
    if (!input.validity.valid) {
      input.classList.add('popup__input_error');
      
    }else {
      input.classList.remove('popup__input_error');
    }
  }
  
  function setSubmit(form) {
    const button = form.querySelector('.popup__submit');
    const isValid = form.checkValidity();
  
    if (isValid) {
      button.classList.remove('popup__submit_disabled');
      button.removeAttribute('disabled');
    }else {
      button.classList.add('popup__submit_disabled');
      button.setAttribute('disabled', 'disabled');
    }
  }
  
  function resetError () {
   const span = document.querySelectorAll('.form__error');
   const inputError = document.querySelectorAll('.popup__input');
   span.forEach((span) => {
    span.textContent = "";
   })
  
   inputError.forEach((inputError) => {
    inputError.classList.remove('popup__input_error');
   })
  }//функция очистки ошибок

  enableValidition ();
  