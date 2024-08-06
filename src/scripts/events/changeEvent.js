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

async function onDeleteEvent() {
  const eventIdToDelete = getItem('eventIdToDelete');

  try {
    await deletEventInBase(eventIdToDelete);
    removeEventsFromCalendar();
  } catch (err) {
    alert(err.message);
  }
}

const changeTextInBtnForm = () => {
  const createBtnElement = document.querySelector('.event-form__submit-btn');
  if(createBtnElement) {
    createBtnElement.textContent = 'Edit';
  }
}

const getEventTime = date => date.toTimeString().slice(0, 5);

const fillForm = event => {
  const eventFormDataElem = Array.from(document.querySelectorAll('.event-form__field'));

  const startEvent = new Date(event.dateFrom);
  const endEvent = new Date(event.dateTo);

  const month = String(startEvent.getMonth() + 1).padStart(2, '0');
  const eventDay = `${startEvent.getFullYear()}-${month}-${String(startEvent.getDate()).padStart(2, '0')}`;

  eventFormDataElem.forEach(item => {
    const { name } = item;

    switch (name) {
      case 'date':
        item.setAttribute('value', eventDay);
        break;
      case 'startTime':
        item.setAttribute('value', getEventTime(startEvent));
        break;
      case 'endTime':
        item.setAttribute('value', getEventTime(endEvent));
        break;
      default:
        item.value = event[name] || '';
    }
  });
};

function onChangeEvent() {
  const eventIdToChange = getItem('eventIdToDelete');
  const event = getItem('events').find(event => event.id === eventIdToChange);

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
