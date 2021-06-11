const openPopup = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const closePopup = popup.querySelector(".popup__close");
const profileInfo = document.querySelector(".profile-info");
const editSave = document.querySelector('[name="form"]');
const profileName = document.querySelector(".profile__name");
const profileSubline = document.querySelector(".profile__subline");
let inputName = document.querySelector('[name="form-name"]');
let inputSubline = document.querySelector('[name="form-subline"]');

function openForm(evt) {
  evt.classList.add("popup_opened");
}

function closeForm(evt) {
  evt.classList.remove("popup_opened");
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubline.textContent = inputSubline.value;
  closeForm(popup);
}

openPopup.addEventListener("click", function () {
  openForm(popup);
  inputName.value = profileName.textContent;
  inputSubline.value = profileSubline.textContent;
});
closePopup.addEventListener("click", function () {
  closeForm(popup);
});
editSave.addEventListener("submit", editProfile);

const addPlace = document.querySelector(".popup_type_place");
const openPlace = document.querySelector(".profile__add-button");
const closePlace = document.querySelector(".popup__close_type_place");
const savePlace = document.querySelector('[name="form-place"');
const placeName = document.querySelector('[name="place-name"]');
const placeSubline = document.querySelector('[name="place-subline"]');

openPlace.addEventListener("click", function () {
  openForm(addPlace);
});
closePlace.addEventListener("click", function () {
  closeForm(addPlace);
});

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elements = document.querySelector(".elements");
const itemTemplate = document.querySelector("#template").content;
const htmlElement = itemTemplate.cloneNode(true);
const popupPhoto = document.querySelector(".popup_type_photo");
const closepopupPhoto = popupPhoto.querySelector(".popup__close_type_photo");

function renderElements() {
  initialCards.forEach(addCard);
}
function renderElement(el) {
  const htmlElement = itemTemplate.cloneNode(true);
  const element = htmlElement.querySelector(".element");
  htmlElement.querySelector(".element__name").textContent = el.name;
  htmlElement.querySelector(".element__image").src = el.link;
  htmlElement.querySelector(".element__image").alt = el.name;
  like(htmlElement);
  deleteElement(htmlElement);
  openPopupPhoto(element);
  return htmlElement;
}

function addCard(cardElement) {
  elements.prepend(renderElement(cardElement));
}

savePlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    name: placeName.value,
    link: placeSubline.value,
  };
  addCard(newCard);
  closeFormplace();
  evt.target.reset();
});

function like(element) {
  element
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
}

function deleteElement(element) {
  element
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
}

function openPopupPhoto(element) {
  element
    .querySelector(".element__image")
    .addEventListener("click", function () {
      openForm(popupPhoto);
      popupPhoto.querySelector(".popup__image").src =
        element.querySelector(".element__image").src;
      popupPhoto.querySelector(".popup__photoName").textContent =
        element.querySelector(".element__name").textContent;
    });
}

closepopupPhoto.addEventListener("click", function () {
  closeForm(popupPhoto);
});

renderElements();
