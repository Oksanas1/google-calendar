import { getItem, setItem } from '../common/storage.js';
import { closePopup } from '../common/popup.js';
import { deletEventInBase, getEventsLists } from '../common/getEway.js';
import { openModal } from '../common/modal.js';
import { renderEvents } from './events.js';

function removeEventsFromCalendar() {
  getEventsLists().then(list => {
    setItem('events', list);
    setItem('eventIdToDelete', '');
    closePopup();
    renderEvents();
  });
}

const canBeChangeEvent = dateTo => {
  const currentTime = new Date();
  const timeDiff = new Date(dateTo).getTime() - currentTime.getTime();
  if (timeDiff < 600) {
    alert('Event cannot be deleted or change within 15 minutes of its end time.');
    return false;
  }

  return true;
};

async function onDeleteEvent() {
  const eventIdToDelete = getItem('eventIdToDelete');
  const event = getItem('events').find(event => event.id === eventIdToDelete);

  if (!canBeChangeEvent(event.dateTo)) {
    return;
  }

  try {
    await deletEventInBase(eventIdToDelete);
    removeEventsFromCalendar();
  } catch (err) {
    console.err(err.message);
  }
}

const changeTextInBtnForm = () => {
  const createBtnElement = document.querySelector('.event-form__submit-btn');
  if (createBtnElement) {
    createBtnElement.textContent = 'Edit';
  }
};

const getEventTime = date => date.toTimeString().slice(0, 5);

const fillForm = event => {
  const eventFormDataElem = Array.from(document.querySelectorAll('.event-form__field'));

  const startEvent = new Date(event.dateFrom);
  const endEvent = new Date(event.dateTo);

  const month = String(startEvent.getMonth() + 1).padStart(2, '0');
  const eventDay = `${startEvent.getFullYear()}-${month}-${String(startEvent.getDate()).padStart(2, '0')}`;

  eventFormDataElem.forEach(item => {
    const { name } = item;

    /* eslint-disable no-param-reassign */
    switch (name) {
      case 'date':
        item.value = eventDay;
        break;
      case 'startTime':
        item.value = getEventTime(startEvent);
        break;
      case 'endTime':
        item.value = getEventTime(endEvent);
        break;
      default:
        item.value = event[name] || '';
    }
    /* eslint-enable */
  });
};

function onChangeEvent() {
  const eventIdToChange = getItem('eventIdToDelete');
  const event = getItem('events').find(event => event.id === eventIdToChange);

  if (!canBeChangeEvent(event.dateTo)) {
    return;
  }

  fillForm(event);
  changeTextInBtnForm();
  closePopup();
  openModal();
}

export const updateEvents = () => {
  const changeEventBtn = document.querySelector('.update-event-btn');
  changeEventBtn.addEventListener('click', onChangeEvent);

  const deleteEventBtn = document.querySelector('.delete-event-btn');
  deleteEventBtn.addEventListener('click', onDeleteEvent);
};
