import { getItem, setItem } from '../common/storage.js';
import { closePopup } from '../common/popup.js';
import { deletEventInDB, getEventByIdFromDB } from '../common/gateways.js';
import { openModal } from '../common/modal.js';
import { renderEvents } from './events.js';

const canBeChangeEvent = dateTo => {
  const currentTime = new Date();
  const timeDiff = new Date(dateTo).getTime() - currentTime.getTime();
  if (timeDiff < 900000) {
    alert('Event cannot be deleted or change within 15 minutes of its end time.');
    return false;
  }

  return true;
};

const onDeleteEvent = async eventIdToDelete => {
  try {
    await deletEventInDB(eventIdToDelete);
    setItem('eventIdToDelete', '');
    closePopup();
    renderEvents();
  } catch (err) {
    console.err(err.message);
  }
};

const onChangeEvent = event => {
  closePopup();
  openModal(event);
};

const onToggleChangeEvent = async e => {
  const eventIdToDelete = getItem('eventIdToDelete');
  let event;

  try {
    event = await getEventByIdFromDB(eventIdToDelete);
  } catch (err) {
    console.error(err);
    closePopup();
    return;
  }

  if (!canBeChangeEvent(new Date(event.dateTo))) {
    setItem('eventIdToDelete', '');
    closePopup();
    return;
  }

  if (e.target.classList.contains('update-event-btn')) {
    onChangeEvent(event);
  } else {
    onDeleteEvent(eventIdToDelete);
  }
};

export const updateEvents = () => {
  const popupBtnElements = Array.from(document.querySelectorAll('.popup__button'));
  popupBtnElements.forEach(popupBtn => popupBtn.addEventListener('click', onToggleChangeEvent));
};
