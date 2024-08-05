let todayElement;
let intervalId;

const calculateRedLinePosition = () => {
  const currentTime = new Date();
  const minutesSinceStartOfDay = currentTime.getHours() * 60 + currentTime.getMinutes();
  return minutesSinceStartOfDay;
};

const setPositionRedLine = () => {
  if (!todayElement) return;
  let hasScrolled = false;

  const topAlign = calculateRedLinePosition();
  todayElement.classList.add('today__time');
  todayElement.style.setProperty('--today__timeBeforeTop', `${topAlign}px`);
  if (!hasScrolled) {
    window.scrollTo({
      top: todayElement.offsetTop + topAlign,
      behavior: 'smooth'
    });
    hasScrolled = true;
  }
};

const startInterval = () => {
  setPositionRedLine();
  intervalId = setInterval(setPositionRedLine, 10000);
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
    return null;
  }

  setPositionRedLine();
  startInterval();
  activeListener();
  return null;
}

export default activeTimeScale;
