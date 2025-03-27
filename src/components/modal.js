const openPopup = (popup) => {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape);
};

const closePopup = (popup) => {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (event) => {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup")) {
        closePopup(event.target);
    }
};

export {openPopup, closePopup, handleOverlayClick};