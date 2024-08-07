import { setItem, getItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { closeModal } from '../common/modal.js';
import { createEventInBase, getEventsLists, updateEventInBase } from '../common/getEway.js';
import { getDateTime } from '../common/time.utils.js';
import { validateEvent } from './validationEvent.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const buttonSaveEventsElement = document.querySelector('.event-form__submit-btn');

const createNewEventObj = ({ title, description, endTime, startTime, date, color }) => {
  const existingEventId = getItem('eventIdToDelete') || '';

  const dateFrom = getDateTime(date, startTime).getTime();
  const dateTo = getDateTime(date, endTime).getTime();

  return { id: existingEventId, title, description, color, dateFrom, dateTo };
};

function onCloseEventForm() {
  closeModal();
  setItem('eventIdToDelete', '');
}

async function onCreateEvent(formData) {
  const newObj = createNewEventObj(formData);
  if (!validateEvent(newObj)) {
    return;
  }

  try {
    const operation = newObj.id ? updateEventInBase(newObj.id, newObj) : createEventInBase(newObj);
    await operation;

    const list = await getEventsLists();
    setItem('events', list);
    onCloseEventForm();
    renderEvents();
  } catch (err) {
    console.error(err.message);
  }
}

export function initEventForm(event) {
  if (!event) {
    return;
  }

  event.preventDefault();

  const formData = Object.fromEntries(new FormData(eventFormElem));
  onCreateEvent(formData);
}

buttonSaveEventsElement.addEventListener('click', event => initEventForm(event));
closeEventFormBtn.addEventListener('click', onCloseEventForm);
