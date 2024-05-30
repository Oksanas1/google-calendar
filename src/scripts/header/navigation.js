import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  displayedMonthElem.textContent = getDisplayedMonth(new Date(getItem('displayedWeekStart')));
}

const onChangeWeek = (event) => {
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
        getStartOfWeek(new Date(memorySartWeek.setDate(memorySartWeek.getDate() - 1))));
      break;
    case 'next':
      setItem(
        'displayedWeekStart',
        getStartOfWeek(new Date(memorySartWeek.setDate(memorySartWeek.getDate() + 8))));
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
