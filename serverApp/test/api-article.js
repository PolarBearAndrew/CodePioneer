var request = require('request');

//init data
var initData = {
    title: 'New JavaScript in 2015 !!',
    url: 'https://www.google.com.tw',
    author: 'AndrewChen',
    from: 'FaceBook',
    describe: 'this is the world future...',
    info: ["200 comments", "999 likes"]
};

var aid = null;

var Article = require('../models/article.js');

describe('[ API unit test - articles ]', function() {

    before(function() {

        return Article.remove({ author: 'AndrewChen' }, (err, result) => {

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

                //test data
                data = JSON.parse( data );
                Object.keys(initData).map(( key, index ) => {
                    if( index !== 5 )
                        data.should.have.property( key, initData[key] );
                });

                data.should.have.property('info').with.lengthOf(2);
                data.info[0].should.equal( initData.info[0] );
                data.info[1].should.equal( initData.info[1] );

                return done();
            });
        });

        it('[GET] 查詢文章(aid)', ( done ) => {

            request({
                url: 'http://localhost:8080/api/articles/',
                method: 'GET',
                form: { aid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data = JSON.parse( data );
                Object.keys(initData).map(( key, index ) => {
                    if( index !== 5 )
                        data.should.have.property( key, initData[key] );
                });

                data.should.have.property('info').with.lengthOf(2);
                data.info[0].should.equal( initData.info[0] );
                data.info[1].should.equal( initData.info[1] );


                return done();
            });
        });

        it('[GET] 查詢最新文章(10)', ( done ) => {

            request({
                url: 'http://localhost:8080/api/articles/news/',
                method: 'GET'
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                // //test data
                data = JSON.parse( data );
                data.should.with.lengthOf(10);

                return done();
            });
        });

        it('[GET] 查詢最新文章(n)', ( done ) => {

            let count = 5;

            request({
                url: 'http://localhost:8080/api/articles/news/' + count,
                method: 'GET'
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                // //test data
                data = JSON.parse( data );
                data.should.with.lengthOf(count);

                return done();
            });
        });

        it('[PUT] 修改文章資訊', ( done ) => {

            let expectData = {
                aid: aid,
                title: 'New JavaScript in 2099 !!',
                url: 'https://www.google.com.tw',
                author: 'Doro',
                from: 'Twitter',
                describe: 'this is the world future...',
                info: ['215 comments', '1001 likes']
            };

            request({
                url: 'http://localhost:8080/api/articles/',
                method: 'PUT',
                form: expectData
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                delete expectData.aid;

                //test data
                data = JSON.parse( data );
                data.should.have.property('ok', 1);
                data.should.have.property('nModified', 1);
                data.should.have.property('n', 1);

                return done();
            });
        });

        it('[DELETE] 刪除文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/articles/',
                method: 'DELETE',
                form: { aid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                // //test data
                data = JSON.parse( data );
                data.should.have.property('ok', 1);
                data.should.have.property('n', 1);

                return done();
            });
        });
    });



    after( () => {

        // 任何需要在測試後刪除的資料
        //console.log('after');
    });
});
