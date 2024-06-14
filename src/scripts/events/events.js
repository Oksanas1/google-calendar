import { getItem, setItem } from '../common/storage.js';
import { openPopup } from '../common/popup.js';
import shmoment from '../common/shmoment.js';

const weekElem = document.querySelector('.calendar__week');

function handleEventClick(event) {
  const targetObj = event.target;
  
  if (!targetObj.className.includes('event')){
    return null;
  }

  openPopup(event.pageX, event.pageY);
  setItem('eventIdToDelete', targetObj.dataset.eventId);
};

const createEventElement = (event) => {
  const startEvent = new Date(event.start);
  const endEvent = new Date(event.end);
  const heightBlockEvent = (endEvent - startEvent) / 1000 / 60;

  const newEventElement = document.createElement('div');
  newEventElement.classList.add('event');
  newEventElement.dataset.eventId = event.id;
  newEventElement.setAttribute('style',`
    top: ${startEvent.getMinutes()}px;
    height: ${heightBlockEvent}px;
    background:${event.color};`);

  const eventTitle = document.createElement('h4');
  eventTitle.classList.add('event__title');
  eventTitle.textContent = event.title;

  const eventTime = document.createElement('p');
  eventTime.classList.add('event__time');
  eventTime.textContent = `${new Date(startEvent).toString().slice(16, 21)} - ${new Date(endEvent).toString().slice(16, 21)}`;

  newEventElement.append(eventTitle);
  newEventElement.append(eventTime);

  return newEventElement;
};

export const renderEvents = () => {
  const timeSlotsElements = Array.from(document.querySelectorAll('.calendar__time-slot'));
  timeSlotsElements.map(slot => slot. textContent = '');
  const eventList = getItem('events') || [];

  const startWeekDay = new Date(getItem('displayedWeekStart'));
  const endWeekDay = shmoment(startWeekDay).add('days', 7).result();
  let eventStart = '';

  eventList
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

const onStorageChange = () => {
  renderEvents();
}

window.addEventListener('storage', onStorageChange);
weekElem.addEventListener('click', handleEventClick);
