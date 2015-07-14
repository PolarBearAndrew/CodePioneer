var mongoose = require('mongoose').connect('mongodb://127.0.0.1:27017/CodePioneer'),
    db = mongoose.connection;

/*
 *  Schema of User
 */
var User = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    pwd: {
        type: String
    },
    like: {
        type: Array
    }
});

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
    describe: {
        type: String
    },
    rank: {
        type: Number
    },
    info: {
        type: Array
    },
});


//exports model
module.exports = {
    User: db.model('user', User),
    Article: db.model('article', Article)
};
