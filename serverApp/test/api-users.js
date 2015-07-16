// var should = require('should');
var request = require('request');

//init data
var initData = {
    name: 'AndrewChen',
    email: 'chenpoanandrew@gmail.com',
    pwd: '123'
};

var uid = null;

var User = require('../models/user.js');

describe('[ API unit test ]', function() {

    before(function() {

        return User.remove({}, (err, result) => {

            //init data
            var user = new User(initData);
            user.save((err, result) => {
                uid = result._id;
            });
        });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'POST',
                form: initData
            }, (err, res, data) => {

                data = JSON.parse( data );

                //set uid for next test
                uid = data._id.toString();

                //test api exist
                res.statusCode.should.equal(200);

                //test data
                data.should.have.property( '_id', uid );
                data.should.have.property( 'name', initData.name );
                data.should.have.property( 'email', initData.email );
                data.should.have.property( 'pwd', initData.pwd );

                return done();
            });
        });

        it('[GET] 查詢使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'GET',
                form: { uid: uid }
            }, (err, res, data) => {

                data = JSON.parse( data );

                //test api exist
                res.statusCode.should.equal(200);

                //test data
                data.should.have.property( '_id', uid );
                data.should.have.property( 'name', initData.name );
                data.should.have.property( 'email', initData.email );
                data.should.have.property( 'pwd', initData.pwd );

                return done();
            });
        });

        it('[PUT] 修改使用者', ( done ) => {

            let expectData = {
                _id: uid,
                name: 'AndrewChen',
                email: 'chenpoanandrew@gmail.com',
                pwd: '456' //<- new pwd
            };;

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'PUT',
                form: expectData
            }, (err, res, data) => {

                //test api exist
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                // data.should.have.property( '_id', uid );
                data.should.have.property( 'name', initData.name );
                data.should.have.property( 'email', initData.email );
                data.should.have.property( 'pwd', expectData.pwd );

                return done();
            });
        });

        it('[POST] 登入檢查*', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/login',
                method: 'POST',
                form: {
                    email: initData.email,
                    pwd: initData.pwd
                }
            }, (err, res, data) => {

                //test api exist
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                data.should.have.property( 'login', true );

                return done();
            });
        });

        it('[DELETE] 刪除使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'DELETE',
                form: { uid: uid }
            }, (err, res, data) => {

                //test api exist
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                // data._id.should.equal( uid );

                data.should.have.property( 'ok', 1 );

                return done();
            });
        });
    });

    after(function(){

        // 任何需要在測試後刪除的資料
        //console.log('after');
    });
});
