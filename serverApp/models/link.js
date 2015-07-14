var mongoose = require('mongoose').connect('mongodb://127.0.0.1:27017/CodePioneer'),
    db = mongoose.connection;

//exports model
module.exports = { mongoose: mongoose, db: db };
