// var should = require('should');
var request = require('request');

//init data
var initData = {};

var User = require('../models/user.js');

describe('[ API unit test - like (13) ]', function() {

    describe('破壞性測試, 蓄意少傳參數', () => {

        it('[POST] (破壞性測試) 新增收藏', ( done ) => {

            request({
                url: 'http://localhost:8080/api/like/',
                method: 'POST',
                json: true,
                form: {}
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        it('[GET] (破壞性測試) 查詢收藏文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/like/',
                method: 'GET',
                json: true,
                form: {}
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        it('[DELETE] (破壞性測試) 刪除收藏文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/like/',
                method: 'DELETE',
                json: true,
                form: {}
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });
    });
});
