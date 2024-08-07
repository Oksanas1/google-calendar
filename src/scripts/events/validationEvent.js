import { getItem } from '../common/storage.js';

const isToday = dateString => {
  const today = new Date().toLocaleDateString();
  return new Date(dateString).toLocaleDateString() === today;
};

const getFilterEvents = () => {
  const eventList = getItem('events') || [];
  return eventList.filter(event => isToday(event.dateFrom));
};

export const validateEvent = newEvent => {
  const existingEvents = getFilterEvents();
  const { dateFrom, dateTo } = newEvent;
  const currentEventDateFrom = new Date(dateFrom).getTime();
  const currentEventDateTo = new Date(dateTo).getTime();

  let result = true;
  const textMessage = [];

  const diffMinut = (currentEventDateTo - currentEventDateFrom) / 60000;
  if (diffMinut > 360) {
    textMessage.push('Event duration cannot exceed 6 hours.');
    result = false;
  }

  if (diffMinut < 0) {
    textMessage.push('Event cannot end before start');
    result = false;
  }

  const isOverlapping = existingEvents.some(({ dateFrom, dateTo }) => {
    const existingStart = dateFrom.getTime();
    const existingEnd = dateTo.getTime();

    return currentEventDateFrom < existingEnd && currentEventDateTo > existingStart;
  });

  if (isOverlapping) {
    textMessage.push('Events cannot overlap.');
    result = false;
  }

  if (textMessage.length > 0) {
    alert(textMessage.join('\n'));
  }

  return result;
};
