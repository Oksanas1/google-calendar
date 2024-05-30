import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth, generateWeekRange } from '../common/time.utils.js';

const todayButtonElement = document.querySelector('.navigation__today-btn');

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month
  displayedMonthElem.textContent = getDisplayedMonth(new Date(getItem('displayedWeekStart')));
}

const onChangeWeek = (event) => {
  // при переключении недели обновите displayedWeekStart в storage
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  if (event.target.className === 'navigation') return;

  const memorySartWeek = new Date(getItem('displayedWeekStart'));
  const eventTargetDirection = event.target.dataset.direction;
  const directionOfButton = (eventTargetDirection) 
    ? eventTargetDirection 
    : event.target.closest('button').dataset.direction;

  switch(directionOfButton) {
    case 'prev':
      setItem(
        'displayedWeekStart',
        new Date(memorySartWeek.setDate(memorySartWeek.getDate() - 7)));
      break;
    case 'next':
      setItem(
        'displayedWeekStart',
        new Date(memorySartWeek.setDate(memorySartWeek.getDate() + 8)));
      break;
    default:
      setItem(
        'displayedWeekStart',
        getStartOfWeek(new Date()));
  }

  renderHeader();
  renderWeek();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
