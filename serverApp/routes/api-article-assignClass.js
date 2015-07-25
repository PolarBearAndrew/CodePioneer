//express
var express = require('express');
var router = express.Router();

//debug
var debug = require('debug')('API:article');

//models
var User = require('../models/user.js');
var	Article = require('../models/article.js');

//feature
let checkPorperty = require('../feature/checkProperty.js');
let check = checkPorperty.check;

//=======================================================

/*
 * [GET] 查詢最新文章(10)(指定分類)
 * request :
 * respone : db result
 */
router.get('/news/:class', (req, res, next) => {

    debug('[GET] 查詢最新文章(10)(指定分類) req.body ->', req.body );

    //no check

    //db operation
    Article.find()
            .limit(10)
            .sort({ time: -1 })
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢最新文章(10)(指定分類) success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 查詢最新文章(10)(指定分類) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 接續查詢文章(10)(指定分類)
 * request : body.finalIndex, body.lastestTime
 * respone : db result
 */
router.get('/more/:class', (req, res, next) => {

    let miss = check( req.body, ['finalIndex'] );
    if(!miss.check){
        debug('[GET] 接續查詢文章(10)(指定分類) miss data ->', miss.missData);
        return next(err);
    }

    let finalIndex = req.body.finalIndex;
    let count = ( parseInt(finalIndex, 10) + 10 );

    //db operation
     Article.find()
            .limit(count)
            .where('time <= ' + req.body.lastestTime)
            .sort({ time: -1 })
            .execAsync()
            .then( (result) => {

                let data = result.filter( (value, index) => {
                    return index >= finalIndex;
                });

                //debug('[GET] 接續查詢文章(10)(指定分類) success (result) ->', result);
                debug('[GET] 接續查詢文章(10)(指定分類) success (data) ->', data);

                res.json( data );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 接續查詢文章(10) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢喜愛文章(指定分類)
 * request : body.like
 * respone : db result
 */
router.get('/like/:class', (req, res, next) => {

    let miss = check( req.body, ['like'] );
    if(!miss.check){
        debug('[GET] 查詢喜愛文章(指定分類) miss data ->', miss.missData);
        return next(err);
    }

    //db operation
     Article.find()
            .where('_id').in(req.body.like)
            .sort({ time: -1 })
            .execAsync()
            .then( (result) => {

                debug('[GET] 查詢喜愛文章(指定分類) success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 查詢喜愛文章(指定分類) fail ->', err);
                return next(err);
            });
});

module.exports = router;