import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';
import { generateWeekRange } from '../common/time.utils.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  const targetObj = event.target;
  
  if (!targetObj.classList.contains('event')) return;

  openPopup(event.pageX, event.pageY);
  setItem('eventIdToDelete', targetObj.dataset.eventId);
};

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement
  const startEvent = new Date(event.start);
  const endEvent = new Date(event.end);
  const heightBlockEvent = (endEvent - startEvent) / 1000 / 60 * 2;

  const newEventElement = document.createElement('div');
  newEventElement.classList.add('event');
  newEventElement.dataset.eventId = event.id;
  newEventElement.setAttribute('style', `top: ${startEvent.getMinutes() * 2}px; height: ${heightBlockEvent}px`)

  const eventTitle = document.createElement('h4');
  eventTitle.classList.add('event__title');
  eventTitle.textContent = event.title;

  const eventTime = document.createElement('p');
  eventTime.classList.add('event__time');
  eventTime.textContent = `${startEvent.getHours()}:${startEvent.getMinutes()} - ${endEvent.getHours()}:${endEvent.getMinutes()}`;

  newEventElement.append(eventTitle);
  newEventElement.append(eventTime);

  return newEventElement;
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
  const timeSlotsElements = Array.from(document.querySelectorAll('.calendar__time-slot'));
  timeSlotsElements.map(slot => slot. textContent = '');

  const weeksDays = generateWeekRange(getItem('displayedWeekStart'));

  getItem('events')
    .filter(event => (
      new Date(event.start) > new Date(weeksDays[0]) 
        && new Date(event.start) < new Date(weeksDays[6])))
    .map(event => {
      const eventStart = new Date(event.start);
      const timeSlotElement = document.querySelector(`div[data-day="${eventStart.getDate()}"] div[data-time="${eventStart.getHours()}"]`);

      timeSlotElement.append(createEventElement(event));
    });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  const eventIdToDelete = +getItem('eventIdToDelete');
  setItem('events', getItem('events').filter(event => event.id !== eventIdToDelete));

  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
