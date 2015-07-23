var request = require('request');

//init data
var initData = {};

var aid = null, uid = null;
var lastestTime = null;
var tmpAidForLike = null;

var Article = require('../models/article.js');

describe('[ API unit test - articles ]', function() {

    describe('破壞性測試, 蓄意少傳參數', () => {

        it('[POST] (破壞性測試) 新增文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/',
                method: 'POST',
                json: true,
                form: initData
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        it('[GET] (破壞性測試) 查詢文章(aid)', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/',
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        it('[GET] (破壞性測試) 接續查詢文章(10)', ( done ) => {

            let finalIndex = 10;

            request({
                url: 'http://localhost:8080/api/article/stream',
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        it('[GET] (破壞性測試) 查詢喜愛文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/like',
                method: 'GET',
                json: true,
                form: { like: tmpAidForLike }
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        it('[PUT] (破壞性測試) 修改文章資訊', ( done ) => {

            let expectData = {};

            request({
                url: 'http://localhost:8080/api/article/',
                method: 'PUT',
                json: true,
                form: expectData
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });
    });
});
