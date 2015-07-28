//mongoose
var link = require('./link.js');
var mongoose = link.mongoose;
var db = link.db;

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
    lastLoginTime: {
        type: Date,
        default: Date.now
    },
    like: { type: Array},
    follow: { type: Array},
});

//exports model
module.exports = db.model('user', User);
