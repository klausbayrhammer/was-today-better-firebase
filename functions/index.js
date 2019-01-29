const functions = require('firebase-functions');
const computeStreak = require('./src/compute-streak');

exports.computeStreak = functions.database.ref('/{oid}/focusAreas/{focusAreaId}/entries/{entryDate}')
  .onCreate(async (snapshot) => {
    const entries = (await snapshot.ref.parent.once('value')).val();
    const streak = computeStreak(entries);
    return snapshot.ref.parent.parent.child('@streak').set(streak);
  });
