const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucket = storage.bucket('lofifocus.appspot.com');

module.exports = bucket;