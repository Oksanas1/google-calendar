import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const dataEventElements = Array.from(document.querySelectorAll('.event-form__field'));
const buttonSaveEventsElement = document.querySelector('.event-form__submit-btn');

function clearEventForm() {
  dataEventElements.map(element => element.value = '');
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

function onCreateEvent(formData) {
  const events = getItem('events');

  events.push({
    id: Math.random().toString(12).slice(2),
    title: formData.title,
    start: getDateTime(formData.date, formData.startTime),
    end: getDateTime(formData.date, formData.endTime),
    description: formData.description,
    color: formData.color,
  });

  setItem('events', events);

  onCloseEventForm();
  renderEvents();
}

export function initEventForm(event) {
  if (!event) return;
  
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(eventFormElem));
  onCreateEvent(formData);
};

buttonSaveEventsElement.addEventListener('click', initEventForm);
closeEventFormBtn.addEventListener('click', onCloseEventForm);
