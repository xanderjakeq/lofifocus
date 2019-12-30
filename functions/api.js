/* eslint-disable callback-return */
const express = require('express');
const cors = require('cors');

const firebase = require('./firebaseConfig');
const { audioTypes } = require('./constants');

const app = express();

const db = firebase.database();

const noiseRef = db.ref(audioTypes.noise);
const lofiRef = db.ref(audioTypes.lofi);

var whitelist = ['https://strtrf.firebaseapp.com', 'http://localhost:3000', 'https://lofifocus.io']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/noisetracks', cors(corsOptions), async (req, res) => {
  const isMember = req.query.isMember === 'true';

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

app.get('/lofitracks', cors(corsOptions), (req, res) => {
	const isMember = req.query.isMember === 'true';

  if (isMember) { 
    lofiRef.once('value', snap => { 
      res.json(snap.val());
    });
  } else { 
    lofiRef.limitToFirst(3).once('value', snap => { 
      res.json(snap.val());
    });
  }
});

module.exports = app;