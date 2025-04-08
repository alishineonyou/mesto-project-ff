import './pages/index.css';
import {
    getCards,
    getProfile,
    editProfile,
    postCard,
    deleteCard,
    deleteLike,
    addLike,
    editProfileImg
} from './components/api.js';
import {removeCard, createCard, toggleLike} from './components/card.js';
import {openPopup, closePopup, handleOverlayClick} from "./components/modal.js";
import {clearValidation, enableValidation} from './components/validation.js'
import {validationConfig} from "./components/validationConfig";

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
const profileImg = document.querySelector('.profile__image');
const popupProfileEditImg = document.querySelector('.popup_type_edit_profile-img');
const editProfileImgForm = document.forms['edit-profile-img'];
const editProfileForm = document.forms['edit-profile'];

let userId;

enableValidation(validationConfig);

const updateProfileDisplay = (profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImg.style.backgroundImage = `url(${profile.avatar})`;

    editProfileForm.name.value = profile.name;
    editProfileForm.description.value = profile.about;

    editProfileImgForm.link.value = profile.avatar;

    userId = profile['_id'];
}

const renderInitialCards = (cards) => {
    cards.forEach(card => addCardToPage(cardsContainer, card, appendToContainer));
}

// Функция показа изображения
const setPopupImage = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupImageBlock);
};

// Добавление в конец контейнера
const appendToContainer = (card) => {
    cardsContainer.append(card);
}

// Добавление в начало контейнера
const prependToContainer = (card) => {
    cardsContainer.prepend(card);
}

// --- Функция добавления карточки на страницу ---
const addCardToPage = (cardsContainer, cardData, containerAddFunction) => {
    const cardId = cardData['_id'];
    cardData.isOwnCard = cardData.owner ? cardData.owner['_id'] === userId : true;
    cardData.likesCount = cardData.likes?.length ?? 0;
    cardData.isLiked = cardData.likes?.some(like => like['_id'] === userId) ?? false;

    const deleteCardFunction = (card) => {
        deleteCard(cardId)
            .then(() => removeCard(card))
            .catch(err => console.log(err));
    }

    const updateLike = (card, isLiked) => {
        const cardLikeCount = card.target.nextElementSibling;
        cardData.likesCount += isLiked ? -1 : 1;
        cardData.isLiked = !isLiked;
        toggleLike(card);
        cardLikeCount.textContent = cardData.likesCount;
    };

    const toggleLikeFunction = (card) => {
        const action = cardData.isLiked ? deleteLike : addLike;

        action(cardId)
            .then(() => updateLike(card, cardData.isLiked))
            .catch(err => console.log(err));
    };

    const card = createCard(
        cardData,
        {
            setPopupImage,
            removeCard: deleteCardFunction,
            toggleLike: toggleLikeFunction
        }
    );
    containerAddFunction(card);
};


Promise.all([getProfile(), getCards()])
    .then(([profileData, cardsData]) => {
        userId = profileData._id;
        updateProfileDisplay(profileData);
        renderInitialCards(cardsData);
    })
    .catch(err => {
        console.error('Ошибка инициализации страницы:', err);
    });

// Открытие попапов
profileImg.addEventListener('click', () => {
    clearValidation(editProfileImgForm, validationConfig);
    openPopup(popupProfileEditImg)
})
buttonCardCreate.addEventListener("click", () => {
    clearValidation(cardCreateForm, validationConfig);
    openPopup(popupCardCreate);
});
buttonProfileEdit.addEventListener('click', () => {
    clearValidation(editProfileForm, validationConfig);
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    openPopup(popupProfileEdit);
});

// Закрытие попапов по кнопке
document.querySelectorAll(".popup__close").forEach(button => {
    button.addEventListener("click", () => closePopup(button.closest(".popup")));
});

// Закрытие попапов по оверлею
document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("mousedown", handleOverlayClick);
});

const renderLoading = (event, isLoading) => {
    event.submitter.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

editProfileImgForm.addEventListener('submit', event => {
    event.preventDefault();
    renderLoading(event, true);
    editProfileImg(editProfileImgForm.link.value)
        .then(profile => {
            profileImg.style.backgroundImage = `url(${profile.avatar})`
            closePopup(popupProfileEditImg);
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(event, false);
        });
})

// Обработчик формы редактирования профиля
editProfileForm.addEventListener('submit', event => {
    event.preventDefault();
    renderLoading(event, true);
    editProfile(editProfileForm.name.value, editProfileForm.description.value)
        .then(profile => {
            profileTitle.textContent = profile.name;
            profileDescription.textContent = profile.about;
            closePopup(popupProfileEdit);
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(event, false);
        });
});

// Обработчик формы добавления карточки
cardCreateForm.addEventListener("submit", event => {
    event.preventDefault();
    renderLoading(event, true);
    postCard(cardNameInput.value, cardUrlInput.value)
        .then(card => {
            addCardToPage(cardsContainer, card, prependToContainer);
            closePopup(popupCardCreate);
        })
        .catch(err => console.log(err))
        .finally(() => {
            cardCreateForm.reset();
            renderLoading(event, false);
        });
});
