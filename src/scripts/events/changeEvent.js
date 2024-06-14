import { getItem, setItem } from '../common/storage.js';
import { closePopup } from '../common/popup.js';
import { deletEventInBase, getEventsLists } from '../common/getEway.js';
import { openModal } from '../common/modal.js';

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

function onChangeEvent() {
  const eventIdToDelete = getItem('eventIdToDelete');
  const event = getItem('events').filter(event => event.id === eventIdToDelete);
  const eventFormDataElem = Array.from(document.querySelectorAll('.event-form__field'));

  eventFormDataElem.map(
    item => {
      switch(item.name) {
        case 'date':
          item.value = event[0]['start'].slice(0, 10);
          break;
        case 'startTime':
          item.value = event[0]['start'].slice(11, 23);
          break;
        case 'endTime':
          item.value = event[0]['end'].slice(11, 23);
          break;
        default: 
          item.value = event[0][item.name];
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

