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
var him = '123456789';

var User = require('../models/user.js');

describe('[ (04) API unit test - follow ]', function() {

    before(function() {

         return User.removeAsync()
                    .then( (result) => {
                        var user = new User(initData);
                        return user.saveAsync();
                    })
                    .spread( (result) => {
                        uid = result._id.toString();
                    })
                    .catch( (err)=>{
                        debug('[ API unit test - article ] 資料初始化錯誤', err);
                    });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增追蹤', ( done ) => {

            request({
                url: 'http://localhost:8080/api/follow/',
                method: 'POST',
                json: true,
                form: {
                    //註：這邊交錯放置是因為him是不寸在得使用者,因此讓him來追蹤uid
                    uid: him,
                    him: uid,
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

        // it('[GET] 查詢追蹤', ( done ) => {

        //     request({
        //         url: 'http://localhost:8080/api/follow/',
        //         method: 'GET',
        //         json: true,
        //         form: { uid: uid }
        //     }, (err, res, data) => {


        //         //test api exist
        //         should.exist(data);
        //         should.not.exist(err);
        //         res.statusCode.should.equal(200);

        //         //test data
        //         data.should.have.property('follow').with.lengthOf(1);

        //         return done();
        //     });
        // });

        it('[DELETE] 取消追蹤', ( done ) => {

            request({
                url: 'http://localhost:8080/api/follow/',
                method: 'DELETE',
                json: true,
                form: {
                    uid: him,
                    him: uid,
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
        return User.removeAsync({ author: 'AndrewChen' }, done);
    });
});
