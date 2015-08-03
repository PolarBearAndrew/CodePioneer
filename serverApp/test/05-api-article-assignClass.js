import request from 'request';
import queryString from '../feature/makerQueryString.js';

//init data
let initData = {
    title: 'New JavaScript in 2015 !!',
    url: 'https://www.google.com.tw',
    author: 'AndrewChen',
    from: 'FaceBook',
    describe: 'this is the world future...',
    info: ["200 comments", "999 likes"]
};

//tmp variable
let aid = null;
let lastestTime = null;
let tmpAidForLike = null;

//config
let config = require('../config.js');

//models
let Article = require('../models/article.js');

describe('[ (05) API unit test - articles-assignClass ]', function() {

    before( () => {

        return Article.remove({ author: 'AndrewChen' }, (err, result) => {

            //init data
            var article = new Article(initData);
            article.save((err, result) => {
                aid = result._id;
                lastestTime = result.lastestTime;
            });
        });
    });

    describe('正常操作測試', () => {

        it('[GET] 查詢最新文章(10)(指定分類)', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/assign/news/' + config.crawlName.github10,
                json: true,
                method: 'GET'
            }, (err, res, data) => {

                //test api exist
                should.exist(data);
                should.not.exist(err);
                res.statusCode.should.equal(200);

                // //test data
                data.should.with.lengthOf(10);

                tmpAidForLike = data;

                return done();
            });
        });

        it('[GET] 接續查詢文章(10)(指定分類)', ( done ) => {

            let finalIndex = 10;

            request({
                url: queryString( 'http://localhost:8080/api/article/assign/more/' + config.crawlName.github10, { finalIndex, lastestTime }),
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

        it('[GET] 查詢喜愛文章(指定分類)', ( done ) => {

            request({
                url: 'http://localhost:8080/api/article/assign/like/' + config.crawlName.github10,
                method: 'GET',
                json: true,
                form: { like: tmpAidForLike }
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
    });

    after( (done) => {
        return Article.findOneAndRemove({ author: 'AndrewChen'})
                      .removeAsync()
                      .then( (result) => {
                          return done();
                      });
    });
});
