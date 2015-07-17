var express = require('express');
var router = express.Router();
var debug = require('debug')('API:article');


//models
var User = require('../models/user.js');
var	Article = require('../models/article.js');

/*
 * [POST] 新增文章
 * request :
 * respone :
 */
router.post('/', (req, res, next) => {

    debug('[POST] 新增文章', 'req.body->', req.body );

    var article = new Article({
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        from: req.body.from,
        describe: req.body.describe,
        info: req.body.info
    });

    article.save( (err, result) => {
        if (err) {
            console.log('[TEST] create test user FAIL, err ->', err);
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

/*
 * [GET] 查詢文章
 * request : aid
 * respone :
 */
router.get('/', (req, res, next) => {

    debug('[GET] 查詢文章', 'req.body->', req.body );

    Article.findOne()
            .where('_id').equals( req.body.aid )
            .execAsync()
            .then( (result) => {
                res.json( result );
            })
            .catch( (err) =>{
                console.log('err', err);
                res.json({err });
            });
});

/*
 * [GET] 查詢最新文章(10)
 * request :
 * respone :
 */
router.get('/', (req, res, next) => {

    debug('[GET] 查詢文章', 'req.body->', req.body );

    Article.find()
            .execAsync()
            .then( (result) => {
                res.json( result );
            })
            .catch( (err) =>{
                console.log('err', err);
                res.json({err });
            });
});

/*
 * [GET] 查詢最新文章(n)
 * request :
 * respone :
 */

/*
 * [PUT] 修改文章
 * request :
 * respone :
 */

/*
 * [DELETE] 刪除文章
 * request :
 * respone :
 */

module.exports = router;