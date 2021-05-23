const openPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile-info');
const editSave = document.querySelector('[name="form"]');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__subline')
let inputName = document.querySelector('[name="form-name"]');
let inputSubline = document.querySelector('[name="form-subline"]');


function openForm() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputSubline.value = profileSubline.textContent;
};

function closeForm() {
    popup.classList.remove('popup_opened');
};

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileSubline.textContent = inputSubline.value;
    closeForm();
};

openPopup.addEventListener('click', openForm);
closePopup.addEventListener('click', closeForm);
editSave.addEventListener('submit', editProfile);