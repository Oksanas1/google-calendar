import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js'; // вернет массив из 7 дней, начиная и переданной даты
import { renderEvents } from '../events/events.js';
import { createNumbersArray } from '../common/createNumbersArray.js';



const generateDay = () => {
  const timeNumbers = createNumbersArray(0,23);

  return timeNumbers
    .map(hour => `<div class="calendar__time-slot" data-time="${hour}"></div>`)
    .join('');
};

const createWeekElements = (day, time) => (
  `<div class="calendar__day" data-day="${day}">
    ${generateDay()}
  </div>`);

export const renderWeek = () => {
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
  const daysWeeks = generateWeekRange(getItem('displayedWeekStart'))
  const calendarWeekElement = document.querySelector('.calendar__week');

  calendarWeekElement.innerHTML = daysWeeks
    .map(day => createWeekElements(new Date(day).getDate(), day))
    .join('');

    renderEvents();
};
