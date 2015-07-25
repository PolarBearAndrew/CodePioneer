// var should = require('should');
var request = require('request');


//init data
var initData = {
    // name: 'AndrewChen',
    // email: 'chenpoanandrew@gmail.com',
    // pwd: '123'
};

var uid = null;

var User = require('../models/user.js');

describe('[ API unit test - users ]', () => {

    describe('破壞性測試, 蓄意少傳參數', () => {

        it('[POST] (破壞性測試) 新增使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'POST',
                json: true,
                form: initData
            }, (err, res, data) => {

                //test api exist
                // should.exist(data);
                // should.not.exist(err);
                res.statusCode.should.equal(500);

                return done();
            });
        });

        it('[POST] (破壞性測試) 登入檢查*', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/login',
                method: 'POST',
                form: {
                    email: initData.email,
                    pwd: initData.pwd
                }
            }, (err, res, data) => {

                res.statusCode.should.equal(500);

                return done();
            });
        });

        it('[GET] (破壞性測試) 查詢使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'GET',
                form: { uid: uid }
            }, (err, res, data) => {

                res.statusCode.should.equal(500);

                return done();
            });
        });

        it('[PUT] (破壞性測試) 修改使用者', ( done ) => {

            let expectData = {
                uid: uid,
                name: 'AndrewChen',
                email: 'chenpoanandrew@gmail.com',
                pwd: '456' //<- new pwd
            };

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'PUT',
                form: expectData
            }, (err, res, data) => {

                res.statusCode.should.equal(500);

                return done();
            });
        });

        it('[DELETE] (破壞性測試) 刪除使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'DELETE',
                form: { uid: uid }
            }, (err, res, data) => {

                res.statusCode.should.equal(500);

                return done();
            });
        });
    });
});
