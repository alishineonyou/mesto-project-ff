const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");

// --- Функция создания карточки ---
const createCard = ({name, link}, {setPopupImage, removeCard, toggleLike} ) => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;

    cardImage.addEventListener("click", () => setPopupImage(name, link));
    card.querySelector(".card__delete-button").addEventListener("click", () => removeCard(card));
    card.querySelector(".card__like-button").addEventListener("click", toggleLike);

    return card;
};

// --- Функция удаления карточки ---
const removeCard = (card) => card.remove();

// --- Функция переключения лайка ---
const toggleLike = (event) => event.target.classList.toggle("card__like-button_is-active");

export {removeCard, createCard, toggleLike};