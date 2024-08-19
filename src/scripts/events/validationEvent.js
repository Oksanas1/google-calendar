import { getEventsListsFromDB } from '../common/gateways.js';

const isToday = dateString => {
  const today = new Date().toLocaleDateString();
  return new Date(dateString).toLocaleDateString() === today;
};

const getFilterEvents = async () => {
  try {
    const eventList = await getEventsListsFromDB();
    return eventList.filter(event => isToday(event.dateFrom));
  } catch (err) {
    console.error(`Error loading events: ${err.message}`);
    return [];
  }
};

const validateEventDuration = (start, end) => {
  const eventDurationMinutes = (end - start) / 60000;
  const errors = [];

  if (eventDurationMinutes > 360) {
    errors.push('Event duration cannot exceed 6 hours.');
  }

  if (eventDurationMinutes < 0) {
    errors.push('Event cannot end before it starts.');
  }

  return errors;
};

const checkForOverlaps = (newEvent, existingEvents) => {
  const { id: newEventId, dateFrom, dateTo } = newEvent;
  const newEventStart = new Date(dateFrom).getTime();
  const newEventEnd = new Date(dateTo).getTime();

  const isOverlapping = existingEvents.some(({ id, dateFrom, dateTo }) => {
    if (id === newEventId) return false;

    const existingEventStart = new Date(dateFrom).getTime();
    const existingEventEnd = new Date(dateTo).getTime();

    return newEventStart < existingEventEnd && newEventEnd > existingEventStart;
  });

  return isOverlapping ? ['Events cannot overlap.'] : [];
};

const displayErrors = errors => {
  if (errors.length > 0) {
    alert(errors.join('\n'));
  }
};

export const validateEvent = async newEvent => {
  const existingEvents = await getFilterEvents();
  const newEventStart = new Date(newEvent.dateFrom).getTime();
  const newEventEnd = new Date(newEvent.dateTo).getTime();

  const errors = [
    ...validateEventDuration(newEventStart, newEventEnd),
    ...checkForOverlaps(newEvent, existingEvents),
  ];

  displayErrors(errors);

  return errors.length === 0;
};
