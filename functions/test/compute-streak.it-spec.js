const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const expect = require('expect');

function getTodaysDate() {
  return new Date().toISOString().split('T')[0];
}

describe('compute-streak.js', () => {
  let firebaseApp;

  before(async function () {
    this.timeout(10000);
    firebaseApp = await firebase.initializeApp({
      apiKey: 'AIzaSyAC26X8bWaMmZJ-v5yr6NsJaLdXkOBDGIs',
      authDomain: 'was-today-better-dev.firebaseapp.com',
      databaseURL: 'https://was-today-better-dev.firebaseio.com',
      projectId: 'was-today-better-dev',
      storageBucket: 'was-today-better-dev.appspot.com',
      messagingSenderId: '110009410201',
    }, 'test-connection');
    return firebaseApp.auth().signInWithEmailAndPassword('test-user@klausbayrhammer.com', '7gXAG2E5dxWTZsWzR9Q5');
  });

  after(async () => {
    await firebaseApp.auth().signOut();
    firebaseApp.delete();
  });

  it('computes the streak of focus areas when adding additional entries', async function () {
    this.timeout(10000);
    const focusAreaRef = firebaseApp.database().ref('/it-compute-streak/focusAreas');
    await focusAreaRef.set({
      focusAreaId: { deleted: false, name: 'TDD' },
    });
    await firebaseApp.database().ref(`/it-compute-streak/focusAreas/focusAreaId/entries/${getTodaysDate()}`).set(1);
    const snapshot = await focusAreaRef.once('value');
    expect(snapshot.val().focusAreaId['@streak']).toEqual({ current: 1 });
  });
});
