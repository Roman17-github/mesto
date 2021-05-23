const openPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile-info');
const editSave = document.querySelector('[name="form"]');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__subline')
let inputName = document.querySelector('[name="Name"]');
let inputSubline = document.querySelector('[name="Subline"]');
inputName.value = profileName.textContent;
inputSubline.value = profileSubline.textContent;

function togglePopup() {
    popup.classList.toggle('popup_opened');
};

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileSubline.textContent = inputSubline.value;
    togglePopup();
};

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
editSave.addEventListener('submit', editProfile);