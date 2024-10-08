import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/utils.js';
import { openModal } from '../common/modal.js';
import activeTimeScale from '../common/activeTimeScale.js';

const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const calendarHeaderElement = document.querySelector('.calendar__header');
const createNewEventsButtonElement = document.querySelector('.create-event-btn');

const createNameOfDayElement = (nameOfDay, dayOfWeek) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  let additionalClasses = '';
  let dayNumberClass = '';
  const dateNumber = dayOfWeek.getDate();

  if (dayOfWeek > today) {
    dayNumberClass = 'day-label__day-number_next-color';
  } else if (dayOfWeek < today) {
    dayNumberClass = 'day-label__day-number_prew-color';
  } else {
    additionalClasses = ' today';
    dayNumberClass = 'today__day-number';
    activeTimeScale(dateNumber);
  }

  return `
    <div class="calendar__day-label day-label${additionalClasses}">
      <span class="day-label__day-name${additionalClasses ? ' today__day-name' : ''}">${nameOfDay}</span>
      <span class="day-label__day-number ${dayNumberClass}">${dateNumber}</span>
    </div>`;
};

export const renderHeader = () => {
  const dateOfStartWeek = getItem('displayedWeekStart');
  const numberOfDaysOfWeek = generateWeekRange(dateOfStartWeek);
  const timeZone = new Date().toString().match(/([A-Z]+[+-][0-9]{2})/)[1];

  calendarHeaderElement.innerHTML =
    `<div class="calendar__time-zon"><span>${timeZone}</span></div>` +
    daysOfWeek.reduce(
      (acc, nameOfDay, index) =>
        acc + createNameOfDayElement(nameOfDay.toUpperCase(), numberOfDaysOfWeek[index]),
      '',
    );
};

createNewEventsButtonElement.addEventListener('click', openModal);
