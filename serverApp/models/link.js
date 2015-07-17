var mongoose = require('mongoose').connect('mongodb://127.0.0.1:27017/CodePioneer'),
    db = mongoose.connection;

//promisify
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

//exports model
module.exports = { mongoose: mongoose, db: db };
