import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const calendarHeaderElement = document.querySelector('.calendar__header');
const createNewEventsButtonElement = document.querySelector('.create-event-btn');

export const renderHeader = () => {
  const numberOfDaysOfWeek = generateWeekRange(getItem('displayedWeekStart'));
  let dateOfWeek = '';
  const todayDateSrting = new Intl.DateTimeFormat('en-US').format(new Date());

  calendarHeaderElement.innerHTML = [
    `<div class="calendar__time-zon"><span>${new Date().toString().match(/([A-Z]+[\+-][0-9][0-9])/)[1]}</span></div>`, 
    ...daysOfWeek.map((day, index) => {
      dateOfWeek = numberOfDaysOfWeek[index];
      
      if(new Intl.DateTimeFormat('en-US').format(dateOfWeek) === todayDateSrting) {
        return `
          <div class="calendar__day-label day-label today">
            <span class="day-label__day-name today__day-name">${day.toUpperCase()}</span>
            <span class="day-label__day-number today__day-number">${dateOfWeek.getDate()}</span>
          </div>`
      }

      return `
        <div class="calendar__day-label day-label">
          <span class="day-label__day-name">${day.toUpperCase()}</span>
          <span class="day-label__day-number">${dateOfWeek.getDate()}</span>
        </div>`
    }
  )].join('');
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
createNewEventsButtonElement.addEventListener('click', openModal);
