/* eslint-disable callback-return */
const express = require('express');
const cors = require('cors');

const firebase = require('./firebaseConfig');
const bucket = require('./storageConfig');
const { audioTypes } = require('./constants');

const app = express();

const db = firebase.database();

const noiseRef = db.ref(audioTypes.noise);
const lofiRef = db.ref(audioTypes.lofi);

const allowlist = ['http://localhost:3000/', 'https://lofifocus.io/'];

const freeTracks = 5;

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('referer')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
} 

app.use(cors(corsOptionsDelegate));

app.get('/noisetracks', async (req, res) => {
  const isMember = req.query.isMember === 'true';

  res.set(`can't-be-evil`, true);
  if (isMember) { 
    noiseRef.once('value', snap => { 
      res.json(snap.val());
    });
  } else { 
    noiseRef.limitToFirst(freeTracks).once('value', snap => { 
      res.json(snap.val());
    });
  }
});

app.get('/lofitracks', (req, res) => {
	const isMember = req.query.isMember === 'true';

  res.set(`can't-be-evil`, true);
  if (isMember) { 
    lofiRef.once('value', snap => { 
      res.json(snap.val());
    });
  } else { 
    lofiRef.limitToFirst(freeTracks).once('value', snap => { 
      res.json(snap.val());
    });
  }
});

app.get('/track/:type/:name', async (req, res) => { 

  const { type, name } = req.params;

  const file = await bucket.file(`${type}/${name}`);

  res.set(`can't-be-evil`, true);

  try {
      const readStream = file.createReadStream();
      readStream.on('end', () => {
        res.end();
      }).pipe(res);
  } catch(err) {
      console.log(err)
  }
});

module.exports = app;
