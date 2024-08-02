let timeoutId;
export const activeTimeScale = () => {
  const today = new Date();
  const todayElement = document.querySelector(`div[data-day="${today.getDate()}"]`);
  const timeElemtnt = document.querySelector(`div[data-time="${today.getHours()}"]`);

  if (!todayElement) {
    clearTimeout(timeoutId);
    return null;
  }

  const topElign = today.getHours() * 60 + today.getMinutes();
  todayElement.classList.add('today__time');
  todayElement.style.setProperty('--today__timeBeforeTop', `${topElign}px`);
  timeElemtnt.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(activeTimeScale, 60000);
};
