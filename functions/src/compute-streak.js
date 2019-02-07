function getDateBeforeReferenceDate(daysBeforeToday, refDate) {
  const dateBeforeReferenceDate = new Date();
  dateBeforeReferenceDate.setDate(refDate.getDate() - daysBeforeToday);
  return dateBeforeReferenceDate.toISOString().split('T')[0];
}

function computeStreakFromDate(entries, refDate) {
  let streak = 0;
  while (entries[getDateBeforeReferenceDate(streak, refDate)] === 1) {
    streak += 1;
  }
  return streak;
}

function longestStreak(entries) {
  const streaks = Object.keys(entries).map(key => computeStreakFromDate(entries, new Date(key)));
  return Math.max(...streaks, 0);
}

function currentStreak(entries) {
  return computeStreakFromDate(entries, new Date());
}

module.exports = (entries) => {
  const current = currentStreak(entries);
  const longest = longestStreak(entries);
  return { current, longest };
};
