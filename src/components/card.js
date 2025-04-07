const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// --- Функция создания карточки ---
const createCard = ({name, link, isOwnCard, isLiked, likesCount}, {setPopupImage, removeCard, toggleLike}) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    const cardLikeCount = card.querySelector('.card__like-count');
    cardLikeCount.textContent = likesCount;

    cardImage.addEventListener("click", () => setPopupImage(name, link));
    const buttonCardDelete = card.querySelector(".card__delete-button");
    if (isOwnCard) {
        buttonCardDelete.addEventListener("click", () => removeCard(card));
    } else {
        buttonCardDelete.hidden = true;
    }
    const buttonCardLike = card.querySelector(".card__like-button");
    if (isLiked) {
        buttonCardLike.classList.add('card__like-button_is-active');
    }
    buttonCardLike.addEventListener("click", event => toggleLike(event));

    return card;
};

// --- Функция удаления карточки ---
const removeCard = (card) => card.remove();

// --- Функция переключения лайка ---
const toggleLike = (event) => event.target.classList.toggle("card__like-button_is-active");

export {removeCard, createCard, toggleLike};