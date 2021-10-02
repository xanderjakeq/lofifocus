const firebase = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

module.exports = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://lofifocus-71c8f-default-rtdb.firebaseio.com"
});
