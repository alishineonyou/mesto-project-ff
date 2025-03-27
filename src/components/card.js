import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// --- Функция создания карточки ---
const createCard = ({ name, link }) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;

    return card;
};

// --- Функция удаления карточки ---
const removeCard = (card) => card.remove();

// --- Функция переключения лайка ---
const toggleLike = (button) => button.classList.toggle("card__like-button_is-active");

// --- Функция работы с попапом изображения ---
const setPopupImage = (imageElement, captionElement, popupBlock, imageSrc, captionText) => {
    imageElement.src = imageSrc;
    imageElement.alt = captionText;
    captionElement.textContent = captionText;
    openPopup(popupBlock);
};

// --- Функция добавления карточки на страницу ---
const addCardToPage = (cardsContainer, cardData) => {
    const card = createCard(cardData);
    cardsContainer.prepend(card);
};

export { removeCard, createCard, toggleLike, setPopupImage, addCardToPage };