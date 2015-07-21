// var should = require('should');
var request = require('request');

//init data
var initData = {
    name: 'AndrewChen(I like article)',
    email: 'chenpoanandrew@gmail.com',
    pwd: '999'
};

var uid = null;
var aid = 'test-article-id';

var User = require('../models/user.js');

describe('[ API unit test - like ]', function() {

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

        it('[POST] 新增收藏', ( done ) => {

            request({
                url: 'http://localhost:8080/api/like/',
                method: 'POST',
                json: true,
                form: {
                    uid: uid,
                    aid: aid
                }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.have.property('ok', 1);
                data.should.have.property('nModified', 1);
                data.should.have.property('n', 1);

                return done();
            });
        });

        it('[GET] 查詢收藏文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/like/?uid=' + uid,
                method: 'GET',
                json: true,
                form: { uid: uid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.lengthOf(1);

                return done();
            });
        });

        it('[DELETE] 刪除收藏文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/like/',
                method: 'DELETE',
                json: true,
                form: {
                    uid: uid,
                    aid: aid
                }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.have.property('ok', 1);

                return done();
            });
        });
    });

    after( (done) => {
        return User.removeAsync({}, done);
    });
});
