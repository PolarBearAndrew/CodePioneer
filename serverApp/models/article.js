var link = require('./link.js');
var mongoose = link.mongoose;
var db = link.db;

/*
 *  Schema of Aricle
 */
var Article = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    author: {
        type: String
    },
    from: {
        type: String
    },
    describe: {
        type: String
    },
    rank: {
        type: Number,
        default: null
    },
    info: {
        type: Array
    },
});

//exports model
module.exports =  db.model('article', Article);
