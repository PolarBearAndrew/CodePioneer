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
    }
});

//exports model
module.exports = {
    User: db.model('user', User)
};
