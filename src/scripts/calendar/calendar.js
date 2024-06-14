import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';

const generateDay = () => {
  const timeNumbers = createNumbersArray(0, 23);

  return timeNumbers
    .map(hour => `<div class="calendar__time-slot" data-time="${hour}"></div>`)
    .join('');
};

const createWeekElements = day => (
  `<div class="calendar__day" data-day="${day}">
    ${generateDay()}
  </div>`
);

export const renderWeek = () => {
  const startWeekDay = getItem('displayedWeekStart');
  const daysOfWeeks = generateWeekRange(startWeekDay)
  const calendarWeekElement = document.querySelector('.calendar__week');

  calendarWeekElement.innerHTML = daysOfWeeks
    .map(day => createWeekElements(new Date(day).getDate()))
    .join('');

  renderEvents();
};
