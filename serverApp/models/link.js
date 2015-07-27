let config = require('../config.js');

let path = config.path.db;

let mongoose = require('mongoose').connect( path + ':27017/CodePioneer'),
    db = mongoose.connection;

//promisify
let Promise = require("bluebird");
Promise.promisifyAll(mongoose);

//exports model
module.exports = { mongoose: mongoose, db: db };
