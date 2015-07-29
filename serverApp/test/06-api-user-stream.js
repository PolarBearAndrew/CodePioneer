var request = require('request');
var queryString = require('../feature/makerQueryString.js');

//debug
var debug = require('debug')('TEST:user');

var User = require('../models/user.js');

var tmpAidForLike = null;
var lastestTime = null;

describe('[ (06) API unit test - user-stream ]', () => {

    before( (done) => {
        return done();
    });

    describe('正常操作測試', () => {
        
//        it('[GET] 查詢使用者(10)', ( done ) => {
//        
//            request({
//                url: 'http://localhost:8080/api/users/stream/',
//                json: true,
//                method: 'GET'
//            }, (err, res, data) => {
//
//                //test api exist
//                should.exist(data);
//                should.not.exist(err);
//                res.statusCode.should.equal(200);
//
//                //test data
//                data.should.with.lengthOf(10);
//
//                tmpAidForLike = data;
//
//                return done();
//            });
//        });

        it('[GET] 接續查詢使用者(10)', ( done ) => {
            let finalIndex = 4;

            request({
                url: queryString('http://localhost:8080/api/users/stream/stream', { finalIndex, lastestTime } ),
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.with.lengthOf(4);

                return done();
            });
        });

        it('[GET] 查詢喜愛使用者(10)', ( done ) => {
//            request({
//                url: queryString('http://localhost:8080/api/users/stream/like'),
//                method: 'GET',
//                json: true,
//            }, (err, res, data) => {
//                
//            });
            //加快測試錯誤用的資料
            let data = null;
            should.exist(data);
            return done();
        });

        it('[GET] 接續查詢喜愛使用者(10)', ( done ) => {
//            request({
//                url: queryString('http://localhost:8080/api/users/stream/like/stream', { finalIndex, lastestTime } ),
//                method: 'GET',
//                json: true,
//            }, (err, res, data) => {
//                
//            });
            //加快測試錯誤用的資料
            let data = null;
            should.exist(data);
            return done();
        });

        it('[GET] 查詢追蹤使用者(10)', ( done ) => {
//           request({
//                url: queryString('http://localhost:8080/api/users/stream/follow'),
//                method: 'GET',
//                json: true,
//            }, (err, res, data) => {
//                
//            });
            //加快測試錯誤用的資料
            let data = null;
            should.exist(data);
            return done();
        });
        
        it('[GET] 接續查詢追蹤使用者(10)', ( done ) => {
//            request({
//                url: queryString('http://localhost:8080/api/users/stream/follow/stream', { finalIndex, lastestTime } ),
//                method: 'GET',
//                json: true,
//            }, (err, res, data) => {
//                
//            });
            //加快測試錯誤用的資料
            let data = null;
            should.exist(data);
            return done();
        });
    });

    after( (done) => {
        return done();
    });
});