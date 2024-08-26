import { globalEventLists } from './events.js';

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

export const validateEvent = async newEvent => {
  const existingEvents = globalEventLists;
  const newEventStart = new Date(newEvent.dateFrom).getTime();
  const newEventEnd = new Date(newEvent.dateTo).getTime();

  const errors = [
    ...validateEventDuration(newEventStart, newEventEnd),
    ...checkForOverlaps(newEvent, existingEvents),
  ];

  if (errors.length > 0) {
    alert(errors.join('\n'));
  }

  return errors.length === 0;
};
