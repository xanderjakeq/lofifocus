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

var whitelist = ['https://strtrf.firebaseapp.com', 'http://localhost:3000', 'https://lofifocus.io', 'http://127.0.0.1:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions));

app.get('/noisetracks', async (req, res) => {
  const isMember = req.query.isMember === 'true';

  res.set(`can't-be-evil`, true);
  if (isMember) { 
    noiseRef.once('value', snap => { 
      res.json(snap.val());
    });
  } else { 
    noiseRef.limitToFirst(3).once('value', snap => { 
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
    lofiRef.limitToFirst(7).once('value', snap => { 
      res.json(snap.val());
    });
  }
});

app.get('/track/:type/:name', async (req, res) => { 

  const { type, name } = req.params;

  const file = await bucket.file(`${type}/${name}`);

  res.set(`can't-be-evil`, true);

  const readStream = file.createReadStream();
  readStream.on('end', () => {
    res.end();
  }).pipe(res);

});

module.exports = app;