// var should = require('should');
var request = require('request');

//debug
var debug = require('debug')('TEST:user');

//init data
var initData = {
    name: 'AndrewChen',
    email: 'chenpoanandrew@gmail.com',
    pwd: '123'
};

var uid = null;

var User = require('../models/user.js');

describe('[ (01) API unit test - users ]', () => {

    before( () => {

        return  User.removeAsync({name: 'AndrewChen'})
                    .then( (result) => {
                        let user = new User(initData);
                        return user.saveAsync();
                    })
                    .spread( (result) => {
                        uid = result._id;
                    })
                    .catch( (err)=>{
                        debug('[ API unit test - users ] 資料初始化錯誤', err);
                    });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'POST',
                json: true,
                form: initData
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                Object.keys(initData).map(( key, index ) => {
                    data.should.have.property( key, initData[key] );
                });

                uid = data._id.toString();

                //set uid for next test
                return done();
            });
        });

        it('[POST] 登入檢查*', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/login',
                method: 'POST',
                json: true,
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
                data.should.have.property( 'login', true );

                return done();
            });
        });

        it('[GET] 查詢使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'GET',
                json: true,
                form: { uid: uid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
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
            };

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'PUT',
                json: true,
                form: expectData
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

        it('[DELETE] 刪除使用者', ( done ) => {

            request({
                url: 'http://localhost:8080/api/users/',
                method: 'DELETE',
                json: true,
                form: { uid: uid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.have.property( 'ok', 1 );

                return done();
            });
        });
    });

    after( (done) => {

        return  User.findOneAndRemove( {_id: uid } )
                    .removeAsync()
                    .then( (result) => {
                        done();
                    })
                    .catch( () => {
                        debug('[ API unit test - users ] 資料還原錯誤', err);
                    });
    });
});
