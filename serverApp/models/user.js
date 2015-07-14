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
    like: {
        type: Array
    }
});

// /*
//  *  Schema of Aricle
//  */
// var Article = new mongoose.Schema({
//     title: {
//         type: String
//     },
//     url: {
//         type: String
//     },
//     author: {
//         type: String
//     },
//     describe: {
//         type: String
//     },
//     rank: {
//         type: Number
//     },
//     info: {
//         type: Array
//     },
// });


//exports model
module.exports = { User: db.model('user', User) };
