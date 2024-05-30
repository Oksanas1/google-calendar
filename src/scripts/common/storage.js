// пример объекта события
const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('Wed May 29 2024 12:16:53 GMT+0300 (Eastern European Summer Time)'),
  end: new Date('Wed May 29 2024 23:16:53 GMT+0300 (Eastern European Summer Time)'),
};
const eventExample2 = {
  id: 0.7520027086457334, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('Wed May 30 2024 12:16:53 GMT+0300 (Eastern European Summer Time)'),
  end: new Date('Wed May 30 2024 23:16:53 GMT+0300 (Eastern European Summer Time)'),
};
const eventExample3 = {
  id: 0.7520027086457335, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('Wed May 26 2024 12:16:53 GMT+0300 (Eastern European Summer Time)'),
  end: new Date('Wed May 26 2024 23:16:53 GMT+0300 (Eastern European Summer Time)'),
};

let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [eventExample, eventExample2, eventExample3],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
  // ф-ция должна устанавливать значения в объект storage
  return storage[key] = value;
};

export const getItem = (key) => {
  // ф-ция должна возвращать по ключу значения из объекта storage
  return storage[key];
};
