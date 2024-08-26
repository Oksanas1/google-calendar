import { setItem, getItem } from '../common/storage.js';
import { savedAndRenderEventsList } from './events.js';
import { closeModal } from '../common/modal.js';
import { createEventInDB, updateEventInDB } from '../common/gateways.js';
import { getDateTime } from '../common/utils.js';
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

const onCloseEventForm = () => {
  closeModal();
  setItem('eventIdToDelete', '');
};

const onCreateEvent = async formData => {
  const newObj = createNewEventObj(formData);
  const isValidEvent = await validateEvent(newObj);
  if (!isValidEvent) {
    return;
  }

  try {
    const operation = newObj.id ? updateEventInDB(newObj.id, newObj) : createEventInDB(newObj);
    await operation;

    onCloseEventForm();
    savedAndRenderEventsList();
  } catch (err) {
    console.error(err.message);
  }
};

export const initEventForm = event => {
  if (!event) {
    return;
  }

  event.preventDefault();

  const formData = Object.fromEntries(new FormData(eventFormElem));
  onCreateEvent(formData);
};

buttonSaveEventsElement.addEventListener('click', event => initEventForm(event));
closeEventFormBtn.addEventListener('click', onCloseEventForm);
