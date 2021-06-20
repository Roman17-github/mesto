const buttonOpenPopupProfile = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_type_edit");
const profileInfo = document.querySelector(".profile-info");
const editSave = document.querySelector('[name="form-edit"]');
const profileName = document.querySelector(".profile__name");
const profileSubline = document.querySelector(".profile__subline");
const inputProfileName = document.querySelector('[name="profile-name"]');
const inputProfileSubline = document.querySelector('[name="profile-subline"]');
const popups = document.querySelectorAll(".popup");
const popupPlace = document.querySelector(".popup_type_place");
const buttonOpenPopupPlace = document.querySelector(".profile__add-button");
const formPopupPlace = document.querySelector('[name="form-place"]');
const inputPlaceName = document.querySelector('[name="place-name"]');
const inputPlaceSubline = document.querySelector('[name="place-subline"]');

function openForm(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeEscPopup);
}

function closeForm(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector('.popup_opened');
    closeForm(openPopup);
  }
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileSubline.textContent = inputProfileSubline.value;
  closeForm(popupEdit);
}



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

function renderElements() {
  initialCards.forEach(addCard);
}
function renderElement(el) {
  const htmlElement = itemTemplate.cloneNode(true);
  const element = htmlElement.querySelector(".element");
  const elemenImage = htmlElement.querySelector(".element__image");
  htmlElement.querySelector(".element__name").textContent = el.name;
  elemenImage.src = el.link;
  elemenImage.alt = el.name;
  like(htmlElement);
  deleteElement(htmlElement);
  openPopupPhoto(element);
  return htmlElement;
}

function addCard(cardElement) {
  elements.prepend(renderElement(cardElement));
}

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
  const elemenImage = element.querySelector(".element__image");
  const popupImage = document.querySelector('.popup__image');
  const elementName = element.querySelector(".element__name");
  elemenImage.addEventListener("click", function () {
      openForm(popupPhoto);
      popupPhoto.querySelector(".popup__image").src =
      elemenImage.src;
      popupPhoto.querySelector(".popup__photoName").textContent =
      elementName.textContent;
      popupImage.alt = elementName.textContent;
    });
}

renderElements();

buttonOpenPopupProfile.addEventListener("click", function () {
  openForm(popupEdit);
  inputProfileName.value = profileName.textContent;
  inputProfileSubline.value = profileSubline.textContent;
  resetValidation(popupEdit);
  
});

editSave.addEventListener("submit", editProfile);

buttonOpenPopupPlace.addEventListener("click", function () {
  openForm(popupPlace);
  resetValidation(formPopupPlace);
  formPopupPlace.reset();
});

formPopupPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = {
    name: inputPlaceName.value,
    link: inputPlaceSubline.value,
  };
  addCard(newCard);
  closeForm(popupPlace);
  evt.target.reset();
});

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) { 
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closeForm(popup);
    }
  });
})//функция закрытия всех попапов нажатием на крестик или оверлей






