import { renderTimescale } from './calendar/timescale.js';
import { renderWeek } from './calendar/calendar.js';
import { renderHeader } from './calendar/header.js';
import { initNavigation } from './header/navigation.js';
import { setItem } from './common/storage.js';
import { getStartOfWeek } from './common/time.utils.js';
import { initEventForm } from './events/createEvent.js';
import { updateEvents } from './events/changeEvent.js';
import { getEventsLists } from './common/getEway.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    renderTimescale();
    setItem('displayedWeekStart', getStartOfWeek(new Date()));
    setItem('displayedWeekStart', getStartOfWeek(new Date()));

    const list = await getEventsLists();
    setItem('events', list);

    renderWeek();
    renderHeader();
    initNavigation();
    initEventForm();
    updateEvents();
  } catch (err) {
    console.error(`Error loading events: ${err.message}`);
  }
});
