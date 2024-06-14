export const activeTimeScale = () => {
  const today = new Date();
  const todayElement = document.querySelector(`div[data-day="${today.getDate()}"]`);

  if (!todayElement) {
    return null;
  }

  const topElign = today.getHours() * 60 + today.getMinutes();
  todayElement.classList.add('today__time');
  todayElement.style.setProperty('--today__timeBeforeTop',`${topElign}px`);
  todayElement.scrollIntoView();

  setTimeout(activeTimeScale, 60000);
};
