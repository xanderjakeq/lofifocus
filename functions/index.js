const functions = require('firebase-functions');
const firebase = require('./firebaseConfig');
const handleAudioUpload = require('./handleAudioUpload');
const api = require('./api');

exports.audioUpload = handleAudioUpload;
exports.api = functions.https.onRequest(api);