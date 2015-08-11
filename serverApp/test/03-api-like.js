// var should = require('should');
var request = require('request');

//debug
var debug = require('debug')('TEST:user');

//init data
var initData = {
    name: 'AndrewChen(I like article)',
    email: 'chenpoanandrew@gmail.com',
    pwd: '999'
};

var uid = null;
var aid = null;

var User = require('../models/user.js');
var Article = require('../models/article.js');

describe('[ (03) API unit test - like ]', function() {

    before(function() {

          return Article.findOne()
                        .execAsync()
                        .then( result => {
                            aid = result._id;
                            return User.removeAsync();
                        })
                        .then( result => {
                            var user = new User(initData);
                            return user.saveAsync();
                        })
                        .spread( result => {
                            uid = result._id.toString();
                        })
                        .catch( err =>{
                            debug('[ API unit test - article ] 資料初始化錯誤', err);
                        });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增收藏', done => {

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
                data.should.have.equal(data);

                return done();
            });
        });

        it('[GET] 查詢收藏文章', done => {

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

        it('[DELETE] 刪除收藏文章', done => {

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
                data.should.have.equal(data);

                return done();
            });
        });
    });

    after( done => {
        return User.removeAsync({ author: 'AndrewChen' }, done);
    });
});
