import { getItem, setItem } from '../common/storage.js';
import { openPopup } from '../common/popup.js';
import shmoment from '../common/shmoment.js';

const weekElem = document.querySelector('.calendar__week');

function handleEventClick(event) {
  const targetObj = event.target;

  if (!targetObj.className.includes('event')) {
    return null;
  }
  const eventId =
    targetObj.className === 'event'
      ? targetObj.dataset.eventId
      : targetObj.parentElement.dataset.eventId;

  openPopup(event.pageX, event.pageY);
  setItem('eventIdToDelete', eventId);
}

const createEventElement = event => {
  const startEvent = new Date(event.dateFrom);
  const endEvent = new Date(event.dateTo);
  const heightBlockEvent = (endEvent - startEvent) / 60000;

  const newEventElement = document.createElement('div');
  newEventElement.classList.add('event');
  newEventElement.dataset.eventId = event.id;
  newEventElement.setAttribute(
    'style',
    `
    top: ${startEvent.getMinutes()}px;
    height: ${heightBlockEvent}px;
    background:${event.color};
    `,
  );

  const eventTitle = document.createElement('h4');
  eventTitle.classList.add('event__title');
  eventTitle.textContent = event.title;
  newEventElement.innerHTML = `
      <h4 class="event__title">${event.title}</h4>
      <p class="event__time">${startEvent.toTimeString().slice(0, 5)} - ${endEvent.toTimeString().slice(0, 5)}</p>
    `;

  return newEventElement;
};

export const renderEvents = () => {
  const timeSlotsElements = Array.from(document.querySelectorAll('.calendar__time-slot'));
  timeSlotsElements.map(slot => (slot.textContent = ''));
  const eventList = getItem('events') || [];

  const startWeekDay = new Date(getItem('displayedWeekStart'));
  const endWeekDay = shmoment(startWeekDay).add('days', 7).result();
  let eventStart = '';

  eventList
    .filter(event => {
      eventStart = new Date(event.dateFrom);
      return eventStart >= startWeekDay && eventStart < endWeekDay;
    })
    .map(event => {
      const eventStart = new Date(event.dateFrom);
      const timeSlotElement = document.querySelector(
        `div[data-day="${eventStart.getDate()}"] div[data-time="${eventStart.getHours()}"]`,
      );

      timeSlotElement.append(createEventElement(event));
    });
};

const onStorageChange = () => {
  renderEvents();
};

window.addEventListener('storage', onStorageChange);
weekElem.addEventListener('click', handleEventClick);
