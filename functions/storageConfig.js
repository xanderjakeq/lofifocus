const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucket = storage.bucket('lofifocus-71c8f.appspot.com');

module.exports = bucket;
