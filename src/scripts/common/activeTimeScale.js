let todayElement;
let intervalId;
let hasScrolled = false;

const calculateRedLinePosition = () => {
  const currentTime = new Date();
  const minutesSinceStartOfDay = currentTime.getHours() * 60 + currentTime.getMinutes();
  return minutesSinceStartOfDay;
};

const setPositionRedLine = () => {
  if (!todayElement) {
    return;
  }

  const topAlign = calculateRedLinePosition();
  todayElement.classList.add('today__time');
  todayElement.style.setProperty('--today__timeBeforeTop', `${topAlign}px`);

  if (!hasScrolled) {
    const redLineElem = document.querySelector('.today__time');
    redLineElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    hasScrolled = true;
  }
};

const startInterval = () => {
  setPositionRedLine();
  intervalId = setInterval(setPositionRedLine, 60000);
};

const resetInterval = () => {
  clearInterval(intervalId);
  startInterval();
};

const activeListener = () => {
  ['mousemove', 'keydown', 'scroll'].forEach(event => {
    window.addEventListener(event, resetInterval);
  });
};

const removeListeners = () => {
  ['mousemove', 'keydown', 'scroll'].forEach(event => {
    window.removeEventListener(event, resetInterval);
  });
};

function activeTimeScale(dateNumber) {
  todayElement = document.querySelector(`div[data-day="${dateNumber}"]`);

  if (!todayElement) {
    clearInterval(intervalId);
    removeListeners();
    hasScrolled = false;
    return;
  }

  setPositionRedLine();
  resetInterval();
  activeListener();
}

export default activeTimeScale;
