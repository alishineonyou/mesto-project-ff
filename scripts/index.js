const cards = document.querySelector(".places__list");

// Функция открытия/закрытия попапов
const openPopup = popup => popup.classList.add("popup_is-opened");
const closePopup = popup => popup.classList.remove("popup_is-opened");

// Открытие попапа добавления карточки
const cardCreateButton = document.querySelector(".profile__add-button");
const cardCreatePopup = document.querySelector(".popup_type_new-card");
cardCreateButton.addEventListener("click", () => openPopup(cardCreatePopup));

// Закрытие попапов
document.querySelectorAll(".popup__close").forEach(button => {
    button.addEventListener("click", () => closePopup(button.closest(".popup")));
});

// Поля формы добавления карточки
const cardName = cardCreatePopup.querySelector(".popup__input_type_card-name");
const cardUrl = cardCreatePopup.querySelector(".popup__input_type_url");
const cardCreateForm = document.querySelector('.popup__form[name="new-place"]');

// Функция удаления карточки
const removeCard = card => card.remove();

// Функция добавления лайка
const toggleLike = event => {
    event.currentTarget.classList.toggle("card__like-button_is-active");
};

// Функция показа изображения
const showContentImage = (name, link) => {
    contentImage.src = link;
    contentImage.alt = name;
    contentCaption.textContent = name;
    openPopup(contentImagePopup);
};

const getTemplate = () => {
    return document
        .querySelector("#card-template")
        .content.querySelector(".places__item")
        .cloneNode(true);
};

// Функция создания карточки
const createCard = ({name, link}, {removeCard, toggleLike, showContentImage}) => {
    const card = getTemplate();

    card.querySelector('.card__title').textContent = name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;

    cardImage.addEventListener("click", () => showContentImage(name, link));
    card.querySelector(".card__delete-button").addEventListener("click", () => removeCard(card));
    card.querySelector(".card__like-button").addEventListener("click", toggleLike);

    return card;
};

// Функция добавления карточки в DOM
const addCardToPage = (cardData) => {
    const card = createCard(cardData, {removeCard, toggleLike, showContentImage});
    cards.prepend(card);
};

// Добавление карточки
cardCreateForm.addEventListener("submit", event => {
    event.preventDefault();

    addCardToPage({name: cardName.value, link: cardUrl.value});
    closePopup(cardCreatePopup);
    cardName.value = "";
    cardUrl.value = "";
});

// Попап с изображением
const contentImagePopup = document.querySelector(".popup_type_image");
const contentImage = contentImagePopup.querySelector(".popup__image");
const contentCaption = contentImagePopup.querySelector(".popup__caption");

// Отображение карточек на странице
initialCards.forEach(addCardToPage);