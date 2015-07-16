// var should = require('should');
var request = require('request');

//init data
var initData = {
    name: 'AndrewChen',
    email: 'chenpoanandrew@gmail.com',
    pwd: '123',
    likeArticle: []
};

var uid = null;
var aid = 'test-article-id';

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

        // it('[POST] 新增收藏', ( done ) => {

        //     request({
        //         url: 'http://localhost:8080/api/articles/',
        //         method: 'POST',
        //         form: {
        //             uid: uid,
        //             aid: aid
        //         }
        //     }, (err, res, data) => {

        //         data = JSON.parse( data );

        //         //test api exist
        //         res.statusCode.should.equal(200);

        //         //test data
        //         data

        //         return done();
        //     });
        // });

        // it('[GET] 查詢使用者', ( done ) => {

        //     request({
        //         url: 'http://localhost:8080/api/articles/',
        //         method: 'GET',
        //         form: { uid: uid }
        //     }, (err, res, data) => {

        //         data = JSON.parse( data );

        //         //test api exist
        //         res.statusCode.should.equal(200);

        //         //test data
        //         data._id.should.equal( uid );
        //         data.name.should.equal( initData.name );
        //         data.email.should.equal( initData.email );
        //         data.pwd.should.equal( initData.pwd );

        //         return done();
        //     });
        // });

        // it('[DELETE] 刪除使用者', ( done ) => {

        //     request({
        //         url: 'http://localhost:8080/api/users/',
        //         method: 'DELETE',
        //         form: { uid: uid }
        //     }, (err, res, data) => {

        //         //test api exist
        //         res.statusCode.should.equal(200);

        //         //test data
        //         data = JSON.parse( data );
        //         // data._id.should.equal( uid );
        //         data.ok.should.equal(1);

        //         return done();
        //     });
        // });
    });

    after(function(){

        // 任何需要在測試後刪除的資料
        //console.log('after');
    });
});
