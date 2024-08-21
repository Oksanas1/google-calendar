import { createNumbersArray } from '../common/utils.js';

const createTimeElement = number => {
  const hour = number < 10 ? `0${number}` : number;

  return `<div class="time-slot">
    <span class="time-slot__time" data-time="${number}">${hour}:00</sapn>
  </div>`;
};

export const renderTimescale = () => {
  const timeNumbers = createNumbersArray(1, 24);
  const calendarTimeScaleElement = document.querySelector('.calendar__time-scale');

  calendarTimeScaleElement.innerHTML = timeNumbers.reduce(
    (acc, curr) => acc + createTimeElement(curr),
    '',
  );
};
