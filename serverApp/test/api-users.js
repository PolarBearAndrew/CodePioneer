var should = require('should');
var request = require('request');

//init data
var initData = {
    name: 'AndrewChen',
    email: 'chenpoanandrew@gmail.com',
    pwd: '123'
};

var expectData = initData;

var uid = null;

var User = require('../models/user.js');

describe('[ API unit test ]', function() {

    before(function() {

        return  User.remove({}, (err, result) => {

            //init data
            // var user = new User(initData);
            // user.save((err, result) => {
            //     uid = result._id;
            // });
        });
    });

    describe('正常操作測試', function() {

        it('[POST] 新增使用者', function() {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'POST',
                form: initData
            }, (err, res, data) => {

                //test api exist
                res.statusCode.should.equal(200);

                initData.name = '123';

                //test data
                data = JSON.parse( data );
                data.should.equal( initData );

                //set uid for next test
                uid = result._id;
                expectData.uid = uid;

                return done();
            });
        });

        // it('[GET] 查詢使用者', function() {

        //     request({
        //         url: 'http://localhost:8080/api/users/',
        //         method: 'GET',
        //         form: { _id: uid }
        //     }, (err, res, data) => {

        //         //test api exist
        //         res.statusCode.should.equal(200);

        //         //test data
        //         data = JSON.parse( data );
        //         data.should.equal( expectData );
        //     });
        // });

        // it('[PUT] 修改使用者', function() {

        //     expectData.pwd = 456;

        //     request({
        //         url: 'http://localhost:8080/api/users/',
        //         method: 'PUT',
        //         form: expectData
        //     }, (err, res, data) => {

        //         //test api exist
        //         res.statusCode.should.equal(200);

        //         //test data
        //         data = JSON.parse( data );
        //         data.should.equal( initData );

        //     });
        // });
    });

    after(function() {
        // 任何需要在測試後刪除的資料
        //console.log('after');
    });
});
