const expect = require('expect');
const computeStreak = require('../src/compute-streak');

function getTodaysDate(dayDifference) {
  const date = new Date();
  date.setDate(date.getDate() + dayDifference);
  return date.toISOString().split('T')[0];
}

describe('compute-streak.js', () => {
  describe('compute current streak', () => {
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
  describe('compute longest streak', () => {
    it('computes longest positive streak without entries', () => {
      const { longest } = computeStreak({});
      expect(longest).toEqual(0);
    });
    it('computes longest positive streak for multiple single entries', () => {
      const entries = {};
      entries[getTodaysDate(0)] = 1;
      entries[getTodaysDate(-1)] = 1;
      const { longest } = computeStreak(entries);
      expect(longest).toEqual(2);
    });

    it('computes longest positive streak for a single entry in the past', () => {
      const entries = {};
      entries[getTodaysDate(-1)] = 1;
      const { longest } = computeStreak(entries);
      expect(longest).toEqual(1);
    });

    it('computes longest positive streak when streak spans two months', () => {
      const entries = {};
      entries['2019-01-31'] = 1;
      entries['2019-02-01'] = 1;
      entries['2019-02-02'] = 1;
      entries['2019-02-03'] = 1;
      const { longest } = computeStreak(entries);
      expect(longest).toEqual(4);
    });
  });
});
