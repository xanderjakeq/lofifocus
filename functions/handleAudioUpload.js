const functions = require('firebase-functions');
const firebase = require('./firebaseConfig');
const { getDownloadUrl, getCleanName } = require('./helpers');
const { audioTypes } = require('./constants');

const db = firebase.database();

const noiseRef = db.ref(audioTypes.noise);
const lofiRef = db.ref(audioTypes.lofi);

module.exports = functions.storage.object().onFinalize( object => {
	const name = object.name;
	
	const cleanName = getCleanName(name);
	const downloadUrl = getDownloadUrl(object);

	if (name.includes(audioTypes.noise)) {
		noiseRef.push({ 
			url: downloadUrl,
			title: cleanName
		});
	} else if (name.includes(audioTypes.lofi)) {
		lofiRef.push({ 
			url: downloadUrl,
			title: cleanName
		});
	}
});