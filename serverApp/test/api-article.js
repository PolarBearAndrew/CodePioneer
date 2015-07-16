var request = require('request');

//init data
var initData = {
    title: 'New JavaScript in 2015 !!',
    url: 'https://www.google.com.tw',
    author: 'AndrewChen',
    from: 'FaceBook',
    describe: 'this is the world future...',
    info: ['200 comments', '999 likes']
};

var aid = null;

var Article = require('../models/article.js');

describe('[ API unit test - articles ]', function() {

    before(function() {

        return Article.remove({}, (err, result) => {

            //init data
            var article = new Article(initData);
            article.save((err, result) => {
                aid = result._id.toString();
            });
        });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/articles/',
                method: 'POST',
                form: initData
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                // //test data
                data = JSON.parse( data );
                data.should.have.property('_id');
                data.should.have.property('title', initData.title);
                data.should.have.property('title', initData.title);
                data.should.have.property('title', initData.title);
                data.should.have.property('title', initData.title);
                data.should.have.property('title', initData.title);

                return done();
            });
        });
    });

    after(function(){

        // 任何需要在測試後刪除的資料
        //console.log('after');
    });
});
