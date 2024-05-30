const modalElement = document.querySelector('.modal');
const modalContentElement = document.querySelector('.modal__content');
const dateEavantElement = document.querySelector('#dateNewEvent');

export function openModal() {
  dateEavantElement.value = new Date().toJSON().slice(0,10);
  modalElement.classList.remove('hidden');
};

//close modal; output: undefined
export function closeModal() {
  modalElement.classList.add('hidden');
};

function onClickInsideModal(event) {
  event.stopPropagation();
};

modalContentElement.addEventListener('click', onClickInsideModal);
modalElement.addEventListener('click', closeModal);
