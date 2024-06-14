import { setItem, getItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { closeModal } from '../common/modal.js';
import { createEventInBase, getEventsLists, updateEventInBase } from '../common/getEway.js';
import { getDateTime } from '../common/time.utils.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');
const buttonSaveEventsElement = document.querySelector('.event-form__submit-btn');

function onCloseEventForm() {
  closeModal();
  setItem('eventIdToDelete', '');
  eventFormElem.reset();
} 

async function onCreateEvent(formData) {
  const eventIdToDelete = getItem('eventIdToDelete') || '';

  const newObj = {
    id: eventIdToDelete,
    title: formData.title,
    description: formData.description,
    color: formData.color,
    start: new Date(getDateTime(formData.date, formData.startTime)).getTime(),
    end: new Date(getDateTime(formData.date, formData.endTime)).getTime(),
  };

  try {
    (eventIdToDelete)
      ? await updateEventInBase(eventIdToDelete, newObj)
      : await createEventInBase(newObj);

    getEventsLists()
      .then(list => {
        setItem('events', list);
        onCloseEventForm();
        renderEvents();
      });
  } catch(err) {
    alert(err.message);
  };
};

export function initEventForm(event) {
  if (!event) {
    return null;
  }
  
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(eventFormElem));
  onCreateEvent(formData);
};

buttonSaveEventsElement.addEventListener('click', initEventForm);
closeEventFormBtn.addEventListener('click', onCloseEventForm);
