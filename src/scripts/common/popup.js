const popupElem = document.querySelector('.popup');
const popupContentElem = document.querySelector('.popup__content');

export const openPopup = (x, y) => {
  popupElem.classList.remove('hidden');
  popupContentElem.style.top = `${y}px`;
  popupContentElem.style.left = `${x}px`;
};

export const closePopup = () => {
  popupElem.classList.add('hidden');
};

const onClickInsidePopup = event => {
  event.stopPropagation();
};

popupContentElem.addEventListener('click', onClickInsidePopup);
popupElem.addEventListener('click', closePopup);
