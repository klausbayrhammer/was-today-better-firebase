const expect = require('expect');
const computeStreak = require('../src/compute-streak');

function getTodaysDate(dayDifference) {
  const date = new Date();
  date.setDate(date.getDate() + dayDifference);
  return date.toISOString().split('T')[0];
}

describe('compute-streak.js', () => {
  it('computes current positive streak without entries', () => {
    const { current } = computeStreak({});
    expect(current).toEqual(0);
  });
  it('computes current positive streak for a single entry', () => {
    const entries = {};
    entries[getTodaysDate(0)] = 1;
    const { current } = computeStreak(entries);
    expect(current).toEqual(1);
  });

  it('computes current positive streak for multiple entries', () => {
    const entries = {};
    entries[getTodaysDate(-1)] = 1;
    entries[getTodaysDate(0)] = 1;
    const { current } = computeStreak(entries);
    expect(current).toEqual(2);
  });
});
