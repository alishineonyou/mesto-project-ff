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
const cardCreateSubmitButton = cardCreatePopup.querySelector(".popup__button");

// Функция создания карточки
const createCard = ({name, link}) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;

    cardImage.addEventListener("click", () => showContentImage(card));
    card.querySelector(".card__delete-button").addEventListener("click", () => card.remove());
    card.querySelector(".card__like-button").addEventListener("click", e => {
        e.currentTarget.classList.toggle("card__like-button_is-active")
    });

    return card;
};

// Добавление карточки
cardCreateSubmitButton.addEventListener("click", () => {
    const newCard = createCard({name: cardName.value, link: cardUrl.value});
    cards.append(newCard);
    closePopup(cardCreatePopup);
    cardName.value = "";
    cardUrl.value = "";
});

// Открытие попапа редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", () => openPopup(profileEditPopup));

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditName = profileEditPopup.querySelector(".popup__input_type_name");
const profileEditDescription = profileEditPopup.querySelector(".popup__input_type_description");
const profileEditSubmitButton = profileEditPopup.querySelector(".popup__button");

// Редактирование профиля
profileEditSubmitButton.addEventListener("click", () => {
    profileTitle.textContent = profileEditName.value;
    profileDescription.textContent = profileEditDescription.value;
    closePopup(profileEditPopup);
});

// Попап с изображением
const contentImagePopup = document.querySelector(".popup_type_image");
const contentImage = contentImagePopup.querySelector(".popup__image");
const contentCaption = contentImagePopup.querySelector(".popup__caption");

// Функция показа изображения
const showContentImage = card => {
    contentImage.src = card.querySelector('.card__image').src;
    contentCaption.textContent = card.querySelector('.card__title').textContent;
    openPopup(contentImagePopup);
};

// Отображение карточек на странице
initialCards.forEach(cardData => cards.append(createCard(cardData)));