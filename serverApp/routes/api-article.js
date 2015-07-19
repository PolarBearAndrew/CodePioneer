//express
var express = require('express');
var router = express.Router();

//debug
var debug = require('debug')('API:article');

//models
var User = require('../models/user.js');
var	Article = require('../models/article.js');

//=======================================================

/*
 * [POST] 新增文章
 * request : body.title, body.url, body.author, body.from
 *           body.describe, body.info
 * respone : db result
 */
router.post('/', (req, res, next) => {

    debug('[POST] 新增文章 req.body ->', req.body );

    var article = new Article({
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        from: req.body.from,
        describe: req.body.describe,
        info: req.body.info
    });

    article.saveAsync()
            .spread( (result) => {
                debug('[POST] 新增文章 success ->', result);
                res.json(result);
            })
            .catch( (err) => {
                debug('[POST] 新增文章 fail ->', err);
                next(err)
            });
});

/*
 * [GET] 查詢文章
 * request : body.aid
 * respone : db result
 */
router.get('/', (req, res, next) => {

    debug('[GET] 查詢文章 req.body ->', req.body );

    Article.findOne()
            .where('_id').equals( req.body.aid )
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢文章 success ->', result);
                res.json( result );
            })
            .catch( (err) =>{
                debug('[GET] 查詢文章 fail ->', err);
                next(err);
            });
});

/*
 * [GET] 查詢最新文章(10)
 * request :
 * respone : db result
 */
router.get('/news', (req, res, next) => {

    debug('[GET] 查詢最新文章(10) req.body ->', req.body );

    Article.find()
            .limit(10)
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢最新文章(10) success ->', result);
                res.json( result );
            })
            .catch( (err) =>{
                debug('[GET] 查詢最新文章(10) fail ->', err);
                next(err);
            });
});

/*
 * [GET] 查詢最新文章(n)
 * request :
 * respone : db result
 */
router.get('/news/:count', (req, res, next) => {

    debug('[GET] 查詢最新文章(n) req.body ->', req.body );

    Article.find()
            .limit(req.params.count)
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢最新文章(n) success ->', result);
                res.json( result );
            })
            .catch( (err) =>{
                debug('[GET] 查詢最新文章(n) fail ->', err);
                next(err);
            });
});

/*
 * [PUT] 修改文章資訊
 * request : body.aid, body.title, body.url, body.author
 *           body.from, body.describe, body.info
 * respone : db result
 */
router.put('/',  function(req, res, next) {

    debug('[PUT] 修改文章資訊 req.body ->', req.body );

    if(!req.body.aid){
        res.json( { err : '資料不完全' } );
        return;
    }

    let info = {
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        from: req.body.from,
        describe: req.body.describe,
        info: req.body.info
    };

    Article.findOneAndUpdate( { _id: req.body.aid }, info )
            .updateAsync()
            .then( (result) => {
                debug('[PUT] 修改文章資訊 success ->', result);
                res.json(result);
            })
            .catch( (err) => {
                debug('[PUT] 修改文章資訊 fail ->', err);
                next(err);
            });
});

/*
 * [DELETE] 刪除文章
 * request : body.aid
 * respone :
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 刪除文章 req.body->', req.body );

    if(!req.body.aid){
        res.json( { err : '資料不完全' } );
        return;
    }

    Article.findOneAndRemove( { _id: req.body.aid } )
            .remove()
            .then( (result) => {
                debug('[DELETE] 刪除文章 success ->', result);
                res.json(result);
            })
            .catch( (err) => {
                debug('[DELETE] 刪除文章 fial ->', err);
                res.json({err});
            });
});

module.exports = router;