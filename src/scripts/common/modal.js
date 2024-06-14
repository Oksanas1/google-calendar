const modalElement = document.querySelector('.modal');
const modalContentElement = document.querySelector('.modal__content');
const dateEavantElement = document.querySelector('#dateNewEvent');

export function openModal() {
  if (!dateEavantElement.value) {
    dateEavantElement.value = new Date().toISOString().slice(0, 10);
  }
  modalElement.classList.remove('hidden');
};

export function closeModal() {
  modalElement.classList.add('hidden');
};

function onClickInsideModal(event) {
  event.stopPropagation();
};

modalContentElement.addEventListener('click', onClickInsideModal);
modalElement.addEventListener('click', closeModal);
