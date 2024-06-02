import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  const targetObj = event.target;
  
  if (!targetObj.classList.contains('event')) return;

  openPopup(event.pageX, event.pageY);
  setItem('eventIdToDelete', targetObj.dataset.eventId);
};

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {
  const startEvent = new Date(event.start);
  const endEvent = new Date(event.end);
  const heightBlockEvent = (endEvent - startEvent) / 1000 / 60;

  const newEventElement = document.createElement('div');
  newEventElement.classList.add('event');
  newEventElement.dataset.eventId = event.id;
  newEventElement.setAttribute('style', `top: ${startEvent.getMinutes()}px; height: ${heightBlockEvent}px; background:${event.color};`)

  const eventTitle = document.createElement('h4');
  eventTitle.classList.add('event__title');
  eventTitle.textContent = event.title;

  const eventTime = document.createElement('p');
  eventTime.classList.add('event__time');
  eventTime.textContent = `${startEvent.getHours()}:${startEvent.getMinutes()} - ${endEvent.getHours()}:${endEvent.getMinutes()}`;

  newEventElement.append(eventTitle);
  newEventElement.append(eventTime);

  return newEventElement;
};

export const renderEvents = () => {
  const timeSlotsElements = Array.from(document.querySelectorAll('.calendar__time-slot'));
  timeSlotsElements.map(slot => slot. textContent = '');

  const startWeekDay = new Date(getItem('displayedWeekStart'));
  const endWeekDay = new Date(new Date(startWeekDay).setDate(startWeekDay.getDate() + 7));
  let eventStart = '';

  getItem('events')
    .filter(event => {
      eventStart = new Date(event.start);
      
      return eventStart >= startWeekDay && eventStart < endWeekDay})
    .map(event => {
      const eventStart = new Date(event.start);
      const timeSlotElement = document.querySelector(`div[data-day="${eventStart.getDate()}"] div[data-time="${eventStart.getHours()}"]`);

      timeSlotElement.append(createEventElement(event));
    }
  );
};

function onDeleteEvent() {
  const eventIdToDelete = +getItem('eventIdToDelete');

  const newListEvents = getItem('events').filter(event => +event.id !== eventIdToDelete);

  setItem('events', newListEvents);

  closePopup();
  renderEvents();
}

const onStorageChange = () => {
  renderEvents();
}

document.addEventListener('storage', onStorageChange);

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
