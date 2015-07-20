// var should = require('should');
var request = require('request');

//init data
var initData = {
    name: 'AndrewChen(I like article)',
    email: 'chenpoanandrew@gmail.com',
    pwd: '999'
};

var uid = null;
var followFrom = '123456789';

var User = require('../models/user.js');

describe('[ API unit test - follow ]', function() {

    before(function() {

        return User.remove({}, (err, result) => {

            //init data
            var user = new User(initData);
            user.save((err, result) => {
                uid = result._id.toString();
            });
        });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增追蹤', ( done ) => {

            request({
                url: 'http://localhost:8080/api/follow/',
                method: 'POST',
                form: {
                    uid: uid,
                    followFrom: followFrom
                }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                data.should.have.property('ok', 1);
                data.should.have.property('nModified', 1);
                data.should.have.property('n', 1);

                return done();
            });
        });

        it('[GET] 查詢追蹤', ( done ) => {

            request({
                url: 'http://localhost:8080/api/follow/',
                method: 'GET',
                form: { uid: uid }
            }, (err, res, data) => {


                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                data.should.have.property('follow').with.lengthOf(1);

                return done();
            });
        });

        it('[DELETE] 取消追蹤', ( done ) => {

            request({
                url: 'http://localhost:8080/api/follow/',
                method: 'DELETE',
                form: {
                    uid: uid,
                    followFrom: followFrom
                }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                data.should.have.property('ok', 1);

                return done();
            });
        });
    });

    after(function(){

        // 任何需要在測試後刪除的資料
        //console.log('after');
        return User.remove({}, (err, result) => {

        });
    });
});
