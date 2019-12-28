const firebase = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

module.exports = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://lofifocus.firebaseio.com"
});