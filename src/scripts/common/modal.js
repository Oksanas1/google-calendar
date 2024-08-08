import shmoment from './shmoment.js';

const modalElement = document.querySelector('.modal');
const modalContentElement = document.querySelector('.modal__content');
const formElement = document.querySelector('.event-form');
const createBtnElement = document.querySelector('.event-form__submit-btn');
const eventFormDataElem = Array.from(document.querySelectorAll('.event-form__field'));

const getEventTime = date => date.toTimeString().slice(0, 5);

const fillForm = event => {
  const startEvent = new Date(event.dateFrom || Date.now());
  const endEvent = event.dateTo
    ? new Date(event.dateTo)
    : shmoment(startEvent).add('minutes', 15).result();

  const eventDay = startEvent.toLocaleDateString().split('/').reverse().join('-');

  const formData = {
    date: eventDay,
    startTime: getEventTime(startEvent),
    endTime: getEventTime(endEvent),
    color: event.color || '#6495ed',
    ...event,
  };

  eventFormDataElem.forEach(item => {
    // eslint-disable-next-line no-param-reassign
    item.value = formData[item.name] || '';
  });

  createBtnElement.textContent = event.id ? 'Edit' : 'Create';
};

export function openModal(event = null) {
  fillForm(event);
  modalElement.classList.remove('hidden');
}

export function closeModal() {
  formElement.reset();
  modalElement.classList.add('hidden');
}

function onClickInsideModal(event) {
  event.stopPropagation();
}

modalContentElement.addEventListener('click', onClickInsideModal);
modalElement.addEventListener('click', closeModal);
