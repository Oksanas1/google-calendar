import { getItem, setItem } from '../common/storage.js';
import { closePopup } from '../common/popup.js';
import { deletEventInDB, getEventsListsFromDB } from '../common/gateways.js';
import { openModal } from '../common/modal.js';
import { renderEvents } from './events.js';

const replacingEventFromStoregeWithDB = () => {
  getEventsListsFromDB().then(list => {
    setItem('events', list);
    setItem('eventIdToDelete', '');
    closePopup();
    renderEvents();
  });
};

const canBeChangeEvent = dateTo => {
  const currentTime = new Date();
  const timeDiff = new Date(dateTo).getTime() - currentTime.getTime();
  if (timeDiff < 900000) {
    alert('Event cannot be deleted or change within 15 minutes of its end time.');
    return false;
  }

  return true;
};

const onDeleteEvent = async () => {
  const eventIdToDelete = getItem('eventIdToDelete');
  const event = getItem('events').find(event => event.id === eventIdToDelete);

  if (!canBeChangeEvent(new Date(event.dateTo))) {
    setItem('eventIdToDelete', '');
    return;
  }

  try {
    await deletEventInDB(eventIdToDelete);
    replacingEventFromStoregeWithDB();
  } catch (err) {
    console.err(err.message);
  }
};

const onChangeEvent = () => {
  const eventIdToChange = getItem('eventIdToDelete');
  const event = getItem('events').find(event => event.id === eventIdToChange);

  if (!canBeChangeEvent(event.dateTo)) {
    setItem('eventIdToDelete', '');
    return;
  }

  closePopup();
  openModal(event);
};

export const updateEvents = () => {
  const changeEventBtn = document.querySelector('.update-event-btn');
  changeEventBtn.addEventListener('click', onChangeEvent);

  const deleteEventBtn = document.querySelector('.delete-event-btn');
  deleteEventBtn.addEventListener('click', onDeleteEvent);
};
