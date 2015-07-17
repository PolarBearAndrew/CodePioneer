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

describe('[ API unit test - users ]', () => {

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

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );

                Object.keys(initData).map(( key, index ) => {
                    data.should.have.property( key, initData[key] );
                })

                uid = data._id.toString();

                //set uid for next test
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
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                data.should.have.property( 'login', true );

                return done();
            });
        });

        it('[GET] 查詢使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'GET',
                form: { uid: uid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );

                Object.keys(initData).map(( key, index ) => {
                    data.should.have.property( key, initData[key] );
                });

                return done();
            });
        });

        it('[PUT] 修改使用者', ( done ) => {

            let expectData = {
                uid: uid,
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
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );

                data.should.have.property('ok', 1);
                data.should.have.property('n', 1);
                data.should.have.property('nModified', 1);

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
                should.exist(data);
                should.not.exist(err);
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
