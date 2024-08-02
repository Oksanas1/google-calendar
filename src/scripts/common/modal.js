const modalElement = document.querySelector('.modal');
const modalContentElement = document.querySelector('.modal__content');
const formElement = document.querySelector('.event-form');

export function openModal() {
  if (!formElement.title.value) {
    formElement.date.value = new Date().toISOString().slice(0, 10);
    formElement.startTime.value = new Date().toTimeString().slice(0, 5);
  }
  modalElement.classList.remove('hidden');
}

export function closeModal() {
  modalElement.classList.add('hidden');
}

function onClickInsideModal(event) {
  event.stopPropagation();
}

modalContentElement.addEventListener('click', onClickInsideModal);
modalElement.addEventListener('click', closeModal);
