// var should = require('should');
var request = require('request');

//init data
var initData = {};

var User = require('../models/user.js');

describe('[ (14) API unit test - follow ]', function() {

    describe('破壞性測試, 蓄意少傳參數', () => {

        it('[POST] (破壞性測試) 新增追蹤', done => {

            request({
                url: 'http://localhost:8080/api/follow/',
                method: 'POST',
                json: true,
                form: {}
            }, (err, res, data) => {

                res.statusCode.should.equal(500);
                return done();
            });
        });

        // it('[GET] (破壞性測試) 查詢追蹤', done => {

        //     request({
        //         url: 'http://localhost:8080/api/follow/',
        //         method: 'GET',
        //         json: true,
        //         form: {}
        //     }, (err, res, data) => {

        //         res.statusCode.should.equal(500);
        //         return done();
        //     });
        // });

        it('[DELETE] (破壞性測試) 取消追蹤', done => {

            request({
                url: 'http://localhost:8080/api/follow/',
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
