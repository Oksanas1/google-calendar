import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

const dataEventElements = Array.from(document.querySelectorAll('.event-form__field'));
const buttonSaveEventsElement = document.querySelector('.event-form__submit-btn');

function clearEventForm() {
  dataEventElements.map(element => element.value = '');
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

function onCreateEvent(formData) {
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
  const events = getItem('events');

  events.push({
    id: Math.random().toString().slice(2),
    title: formData.title,
    start: new Date(`${formData.date} ${formData.startTime}`),
    end: new Date(`${formData.date} ${formData.endTime}`),
    description: formData.description,
    });

  setItem('events', events);

  onCloseEventForm();
  renderEvents();
}

export function initEventForm(event) {
  if (!event) return;
  
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(eventFormElem));
  onCreateEvent(formData);
};

buttonSaveEventsElement.addEventListener('click', initEventForm);
closeEventFormBtn.addEventListener('click', onCloseEventForm);
