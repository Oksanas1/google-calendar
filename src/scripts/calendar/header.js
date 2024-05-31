import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const calendarHeaderElement = document.querySelector('.calendar__header');
const createNewEventsButtonElement = document.querySelector('.create-event-btn');

const createNameOfDayElement = (nameOfDay, dayOfWeek) => {
  const today = new Date(new Date().setHours(0,0,0,0));
  let result = '';

  if (dayOfWeek > today) {
    result = `
      <div class="calendar__day-label day-label">
        <span class="day-label__day-name">${nameOfDay}</span>
        <span class="day-label__day-number day-label__day-number_next-color">${dayOfWeek.getDate()}</span>
      </div>`
  } else if (dayOfWeek < today) {
    result = `
      <div class="calendar__day-label day-label">
        <span class="day-label__day-name">${nameOfDay}</span>
        <span class="day-label__day-number day-label__day-number_prew-color">${dayOfWeek.getDate()}</span>
      </div>`;
  } else {
    result = `
      <div class="calendar__day-label day-label today">
        <span class="day-label__day-name today__day-name">${nameOfDay}</span>
        <span class="day-label__day-number today__day-number">${dayOfWeek.getDate()}</span>
      </div>`;
  }

  return result;
}

export const renderHeader = () => {
  const numberOfDaysOfWeek = generateWeekRange(getItem('displayedWeekStart'));

  calendarHeaderElement.innerHTML = [
    `<div class="calendar__time-zon"><span>${new Date().toString().match(/([A-Z]+[\+-][0-9][0-9])/)[1]}</span></div>`, 
    ...daysOfWeek.map((nameOfDay, index) => createNameOfDayElement(nameOfDay.toUpperCase(), numberOfDaysOfWeek[index]))]
    .join('');
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
createNewEventsButtonElement.addEventListener('click', openModal);
