import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/utils.js';
import shmoment from '../common/shmoment.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

const renderCurrentMonth = () => {
  displayedMonthElem.textContent = getDisplayedMonth(new Date(getItem('displayedWeekStart')));
};

const onChangeWeek = event => {
  const clickedElement = event.target;
  if (clickedElement.className === 'navigation') {
    return;
  }

  const memorySartWeek = new Date(getItem('displayedWeekStart'));
  const eventTargetDirection = clickedElement.dataset.direction;
  const directionOfButton =
    eventTargetDirection || clickedElement.closest('button').dataset.direction;

  switch (directionOfButton) {
    case 'prev':
      setItem(
        'displayedWeekStart',
        getStartOfWeek(shmoment(memorySartWeek).subtract('days', 1).result()),
      );
      break;
    case 'next':
      setItem(
        'displayedWeekStart',
        getStartOfWeek(shmoment(memorySartWeek).add('days', 8).result()),
      );
      break;
    default:
      setItem('displayedWeekStart', getStartOfWeek(new Date()));
  }

  renderWeek();
  renderHeader();
  renderCurrentMonth();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener('click', onChangeWeek);
};
