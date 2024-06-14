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
};

async function onDeleteEvent() {
  const eventIdToDelete = getItem('eventIdToDelete');

  try {
    await deletEventInBase(eventIdToDelete);
    removeEventsFromCalendar();
  } catch (err) {
    alert(err.message);
  };
};

const getEventTime = date => date.toString().slice(16, 21);

function onChangeEvent() {
  const eventIdToDelete = getItem('eventIdToDelete');
  const event = getItem('events').filter(event => event.id === eventIdToDelete)[0];
  const eventFormDataElem = Array.from(document.querySelectorAll('.event-form__field'));

  const startEvent = new Date(event.start);

  const month = startEvent.getMonth() + 1
  event.day = `${startEvent.getFullYear()}-${(month < 10) ? '0' + month: month}-${startEvent.getDate()}`;

  eventFormDataElem.map(
    item => {
      switch(item.name) {
        case 'date':
          item.value = event.day;
          break;
        case 'startTime':
          item.value = getEventTime(startEvent);
          break;
        case 'endTime':
          item.value = getEventTime(new Date(event.end));
          break;
        default: 
          item.value = event[item.name];
      }
  });
  
  closePopup();
  openModal();
};

export const updateEvents = () => {
  const changeEventBtn = document.querySelector('.update-event-btn');
  changeEventBtn.addEventListener('click', onChangeEvent);

  const deleteEventBtn = document.querySelector('.delete-event-btn');
  deleteEventBtn.addEventListener('click', onDeleteEvent);
};

