import { getItem, setItem } from '../common/storage.js';
import { openPopup } from '../common/popup.js';
import shmoment from '../common/shmoment.js';
import { getEventsListsFromDB } from '../common/gateways.js';

const weekElem = document.querySelector('.calendar__week');
export const globalEventLists = [];

const handleEventClick = event => {
  const targetObj = event.target;

  if (!targetObj.className.includes('event')) {
    return;
  }
  const eventId =
    targetObj.className === 'event'
      ? targetObj.dataset.eventId
      : targetObj.parentElement.dataset.eventId;

  setItem('eventIdToDelete', eventId);
  openPopup(event.pageX, event.pageY);
};

const createEventElement = event => {
  const { dateFrom, dateTo, id, title, description } = event;
  const startEvent = new Date(dateFrom);
  const endEvent = new Date(dateTo);
  const heightBlockEvent = (endEvent - startEvent) / 60000;

  const newEventElement = document.createElement('div');
  newEventElement.classList.add('event');
  newEventElement.dataset.eventId = id;
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
  eventTitle.textContent = title;
  newEventElement.innerHTML = `
      <div class="event__header" style="background:${event.color};" data-event-id=${id}>
        <h4 class="event__title">${title}</h4>
        <p class="event__time">${startEvent.toTimeString().slice(0, 5)} - ${endEvent.toTimeString().slice(0, 5)}</p>
      </div>
      <p class="event__description">${description}</p>
    `;

  return newEventElement;
};

export const renderEvents = () => {
  const timeSlotsElements = Array.from(document.querySelectorAll('.calendar__time-slot'));
  timeSlotsElements.forEach(slot => {
    // eslint-disable-next-line no-param-reassign
    slot.innerHTML = '';
  });

  const startWeekDay = new Date(getItem('displayedWeekStart'));
  const endWeekDay = shmoment(startWeekDay).add('days', 7).result();

  const eventsThisWeek = globalEventLists.filter(event => {
    const eventStart = new Date(event.dateFrom);
    return eventStart >= startWeekDay && eventStart < endWeekDay;
  });

  eventsThisWeek.forEach(event => {
    const eventStart = new Date(event.dateFrom);
    const timeSlotSelector = `div[data-day="${eventStart.getDate()}"] div[data-time="${eventStart.getHours()}"]`;
    const timeSlotElement = document.querySelector(timeSlotSelector);

    if (timeSlotElement) {
      timeSlotElement.append(createEventElement(event));
    }
  });
};

const savedEventsList = async () => {
  try {
    globalEventLists.length = 0;
    globalEventLists.push(...(await getEventsListsFromDB()));
  } catch (err) {
    console.error(`Error loading events: ${err.message}`);
  }
};

export const loadAndRenderEvents = async () => {
  await savedEventsList();
  if (globalEventLists.length > 0) {
    renderEvents();
  }
};

weekElem.addEventListener('click', handleEventClick);
