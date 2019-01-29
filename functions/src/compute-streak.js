function getTodaysDate(daysBeforeToday) {
  const date = new Date();
  date.setDate(date.getDate() - daysBeforeToday);
  return date.toISOString().split('T')[0];
}

module.exports = (entries) => {
  let currentStreak = 0;
  while (entries[getTodaysDate(currentStreak)] === 1) {
    currentStreak += 1;
  }
  return { current: currentStreak };
};
