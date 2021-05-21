const openPopup = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile-info');
const editSave = popup.querySelector('.popup__submit');
let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__subline')
let inputName = document.querySelector('.popup__name');
let inputSubline = document.querySelector('.popup__subline');
inputName.value = 'Жак-Ив Кусто';
inputSubline.value = 'Исследователь океана';

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

function togglePopup() {
    popup.classList.toggle('popup_opened');
};

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileSubline.textContent = inputSubline.value;
    
}
editSave.addEventListener('click', editProfile);