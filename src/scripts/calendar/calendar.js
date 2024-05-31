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

const activeTimeScale = () => {
  const today = new Date();
  const todayTimeElement = document.querySelector(`div[data-day="${today.getDate()}"] div[data-time="${today.getHours()}"]`);

  if (!todayTimeElement) return;

  todayTimeElement.classList.add('today__time');
  todayTimeElement.setAttribute('style', ``)
  todayTimeElement.style.setProperty('--today__timeBeforeTop',`${today.getMinutes()}px`);
}

export const renderWeek = () => {
  const daysWeeks = generateWeekRange(getItem('displayedWeekStart'))
  const calendarWeekElement = document.querySelector('.calendar__week');

  calendarWeekElement.innerHTML = daysWeeks
    .map(day => createWeekElements(new Date(day).getDate(), day))
    .join('');

    activeTimeScale()

  renderEvents();
};
