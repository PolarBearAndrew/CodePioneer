var link = require('./link.js');
var mongoose = link.mongoose;
var db = link.db;

var d = new Date();
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
        default: 0
    },
    time: {
        type: Number,
        default: d.getTime()
    },
    info: {
        type: Array,
        default: null
    },
    like: {
        type: Array,
        default: null
    }
});

//exports model
module.exports =  db.model('article', Article);
