import './pages/index.css';
import {initialCards} from './components/cards.js';
import {removeCard, createCard, toggleLike} from './components/card.js';
import {openPopup, closePopup, handleOverlayClick} from "./components/modal.js";

// Контейнер карточек
const cardsContainer = document.querySelector('.places__list');

// --- Попап с изображением ---
const popupImageBlock = document.querySelector(".popup_type_image");
const popupImage = popupImageBlock.querySelector(".popup__image");
const popupCaption = popupImageBlock.querySelector(".popup__caption");

// --- Попап создания карточки ---
const popupCardCreate = document.querySelector(".popup_type_new-card");
const buttonCardCreate = document.querySelector(".profile__add-button");
const cardCreateForm = popupCardCreate.querySelector('.popup__form');
const cardNameInput = cardCreateForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = cardCreateForm.querySelector(".popup__input_type_url");

// --- Попап редактирования профиля ---
const popupProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];

// Инициализация полей формы профиля при загрузке
editProfileForm.name.value = profileTitle.textContent;
editProfileForm.description.value = profileDescription.textContent;

// Функция показа изображения
const setPopupImage = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupImageBlock);
};

// --- Функция добавления карточки на страницу ---
const addCardToPage = (cardsContainer, cardData) => {
    const card = createCard(cardData, {setPopupImage, removeCard, toggleLike});
    cardsContainer.prepend(card);
};

// Отображение стартовых карточек
initialCards.forEach(card => addCardToPage(cardsContainer, card));

// Открытие попапов
buttonCardCreate.addEventListener("click", () => openPopup(popupCardCreate));
buttonProfileEdit.addEventListener('click', () => openPopup(popupProfileEdit));

// Закрытие попапов по кнопке
document.querySelectorAll(".popup__close").forEach(button => {
    button.addEventListener("click", () => closePopup(button.closest(".popup")));
});

// Закрытие попапов по оверлею
document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("mousedown", handleOverlayClick);
});

// Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.textContent = editProfileForm.name.value;
    profileDescription.textContent = editProfileForm.description.value;
    closePopup(popupProfileEdit);
});

// Обработчик формы добавления карточки
cardCreateForm.addEventListener("submit", event => {
    event.preventDefault();
    addCardToPage(cardsContainer, {name: cardNameInput.value, link: cardUrlInput.value});
    closePopup(popupCardCreate);
    cardCreateForm.reset();
});