var mongoose = require('mongoose').connect('mongodb://127.0.0.1:27017/CP_user'),
    db = mongoose.connection;

/*
 *  Schema of User
 */
var User = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String
    }
});

//exports model
module.exports = {
    User: db.model('team', User)
};
