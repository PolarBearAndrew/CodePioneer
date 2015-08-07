// var request = require('request');
// var queryString = require('../feature/makerQueryString.js');

// //debug
// var debug = require('debug')('TEST:user');

// //init data
// var initData = {
//     name: 'AndrewChen',
//     email: 'chenpoanandrew@gmail.com',
//     pwd: '123'
// };


// var User = require('../models/user.js');

// var tmpAidForLike = null;
// var lastestTime = null;
// var uid = null;

// describe('[ (06) API unit test - user-stream ]', () => {
//
//     before( () => {

//         return  User.removeAsync({name: 'AndrewChen'})
//                     .then( result => {
//                         let user = new User(initData);
//                         return user.saveAsync();
//                     })
//                     .spread( result => {
//                         uid = result._id;
//                     })
//                     .catch( err => {
//                         debug('[ API unit test - users ] 資料初始化錯誤', err);
//                     });
//     });

//     describe('正常操作測試', () => {

// //        it('[GET] 查詢使用者(10)', done => {
// //
// //            request({
// //                url: 'http://localhost:8080/api/users/stream/',
// //                json: true,
// //                method: 'GET'
// //            }, (err, res, data) => {
// //
// //                //test api exist
// //                should.exist(data);
// //                should.not.exist(err);
// //                res.statusCode.should.equal(200);
// //
// //                //test data
// //                data.should.with.lengthOf(10);
// //
// //                tmpAidForLike = data;
// //
// //                return done();
// //            });
// //        });
// //
// //        it('[GET] 接續查詢使用者(10)', done => {
// //            let finalIndex = 10;
// //
// //            request({
// //                url: queryString('http://localhost:8080/api/users/stream/stream', { finalIndex, lastestTime } ),
// //                method: 'GET',
// //                json: true,
// //            }, (err, res, data) => {
// //
// //                //test api exist
// //                should.exist(data);
// //                should.not.exist(err);
// //                res.statusCode.should.equal(200);
// //
// //                //test data
// //                data.should.with.lengthOf(10);
// //
// //                return done();
// //            });
// //        });

//         // it('[GET] 查詢喜愛使用者(10)', done => {


//         //     request({
//         //         url: queryString('http://localhost:8080/api/users/stream/like', { uid } ),
//         //         method: 'GET',
//         //         json: true,
//         //     }, (err, res, data) => {

//         //         //test api exist
//         //         should.exist(data);
//         //         should.not.exist(err);
//         //         res.statusCode.should.equal(200);

//         //         //test data
//         //         data.should.with.lengthOf(10);

//         //         tmpAidForLike = data;

//         //         return done();
//         //     });
//         // });

//         // it('[GET] 接續查詢喜愛使用者(10)', done => {
// //            request({
// //                url: queryString('http://localhost:8080/api/users/stream/like/stream', { finalIndex, lastestTime } ),
// //                method: 'GET',
// //                json: true,
// //            }, (err, res, data) => {
// //
// //            });
//             //加快測試錯誤用的資料
//             // let data = null;
//             // should.exist(data);
//             // return done();
//         });
//     });

//     after( done => {
//         return done();
//     });
// });
