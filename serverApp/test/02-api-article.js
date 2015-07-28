var request = require('request');
var queryString = require('../feature/makerQueryString.js');

//debug
var debug = require('debug')('TEST:user');

//init data
var initData = {
    title: 'New JavaScript in 2015 !!',
    url: 'https://www.google.com.tw',
    author: 'AndrewChen',
    from: 'FaceBook',
    describe: 'this is the world future...',
    info: ["200 comments", "999 likes"]
};

var aid = null, uid = null;
var lastestTime = null;
var tmpAidForLike = null;

var Article = require('../models/article.js');

describe('[ API unit test - articles ]', function() {

    before( () => {

        return Article.removeAsync({ author: 'AndrewChen' })
                      .then( (result) => {
                          let article = new Article(initData);
                          return article.saveAsync();
                      })
                      .spread( (result) => {
                          aid = result._id.toString();
                          lastestTime = result.time;
                      })
                      .catch( (err)=>{
                          debug('[ API unit test - article ] 資料初始化錯誤', err);
                      });
    });

    describe('正常操作測試', () => {

        it('[POST] 新增文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/',
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
                url: queryString('http://localhost:8080/api/article/', { aid }),
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
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
                url: 'http://localhost:8080/api/article/news/',
                json: true,
                method: 'GET'
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.with.lengthOf(10);

                tmpAidForLike = data;

                return done();
            });
        });

        it('[GET] 查詢最新文章(n)', ( done ) => {

            let count = 5;

            request({
                url: 'http://localhost:8080/api/article/news/' + count,
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.with.lengthOf(count);

                return done();
            });
        });

        it('[GET] 接續查詢文章(10)', ( done ) => {

            let finalIndex = 10;

            request({
                url: queryString('http://localhost:8080/api/article/stream/', { finalIndex, lastestTime } ),
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.with.lengthOf(10);

                return done();
            });
        });

        it('[GET] 查詢喜愛文章', ( done ) => {

            tmpAidForLike = tmpAidForLike.map( ( value) => {
                return value._id;
            });

            request({
                url: queryString('http://localhost:8080/api/article/like', { like: tmpAidForLike.join(',') } ),
                method: 'GET',
                json: true,
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.with.lengthOf(10);

                return done();
            });
        });

        // it('[GET] 查詢追蹤者的喜愛文章', ( done ) => {

        //     request({
        //         url: queryString('http://localhost:8080/api/article/follow/like', uid ),
        //         method: 'GET',
        //         json: true,
        //     }, (err, res, data) => {

        //         //test api exist
        //         should.exist(data);
        //         should.not.exist(err);
        //         res.statusCode.should.equal(200);

        //         return done();
        //     });
        // });

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
                url: 'http://localhost:8080/api/article/',
                method: 'PUT',
                json: true,
                form: expectData
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                delete expectData.aid;

                //test data
                data.should.have.property('ok', 1);
                data.should.have.property('nModified', 1);
                data.should.have.property('n', 1);

                return done();
            });
        });

        it('[DELETE] 刪除文章', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/',
                method: 'DELETE',
                json: true,
                form: { aid }
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                //test data
                data.should.have.property('ok', 1);
                data.should.have.property('n', 1);

                return done();
            });
        });
    });

    after( (done) => {

        return Article.findOneAndRemove({ author: 'AndrewChen'})
                      .removeAsync()
                      .then( (result) => {
                          return done();
                      });
    });
});
