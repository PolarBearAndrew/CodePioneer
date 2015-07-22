//express
var express = require('express');
var router = express.Router();

//debug
var debug = require('debug')('API:like');

//model
var User = require('../models/user.js');
var Article = require('../models/article.js');

//feature
let checkPorperty = require('../feature/checkProperty.js');
let check = checkPorperty.check;

// bluebird.reject( new Error('xxxxxx') ); //reject : 直接讓promise物件thorw err到catch中
// return bluebird.resolve(data); //resolve包裝一個promise物件,return到下一個then

/*
 * [POST] 新增收藏文章
 * request : body.uid, body.aid
 * respone : { err: false }
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增收藏文章 req.body ->', req.body );

    //check
    let miss = check( req.body, ['uid', 'aid'] );
    if(!miss.check){
        debug('[POST] 新增收藏文章 miss data ->', miss.missData);
        return next(err);
    }

    //tmp variable, destination info
    let likeAry ;
    let info = { _id: req.body.uid };

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                likeAry = result.like;
                likeAry.push( { aid: req.body.aid });
            }

            return(
                User.findOneAndUpdate( info, { like: likeAry } )
                    .updateAsync()
            );
        })
        .then( (result) => {
            debug('[POST] 新增收藏文章 success ->', result);
            res.json(result);
            return;
        })
        .catch( (err) => {
            debug('[POST] 新增收藏文章 fail ->', err);
            return next(err);
        });
});

/*
 * [GET] 查詢收藏文章
 * request : body.uid
 * respone : db result
 */
router.get('/', function(req, res, next) {

    debug('[GET] 查詢收藏文章 req.query ->', req.query );

    //check
    let miss = check( req.query, ['uid'] );
    if(!miss.check){
        debug('[GET] 新增收藏文章 miss data ->', miss.missData);
        return next(err);
    }

    //destination info
    var info = { _id: req.query.uid };

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {
            debug('[GET] 查詢收藏文章 success ->', result.like);
            res.json(result.like);
            return;
        })
        .catch( (err) => {
            debug('[GET] 查詢收藏文章 fail ->', err);
            return next(err);
        });
});

/*
 * [DELETE] 刪除收藏文章
 * request : body.aid
 * respone : { err: false }
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 刪除收藏文章 req.body ->', req.body );

    //check
	let miss = check( req.body, ['uid', 'aid'] );
    if(!miss.check){
        debug('[DELETE] 新增收藏文章 miss data ->', miss.missData);
        return next(err);
    }

    //tmp variable, destination info
    let likeAry;
    let info = { _id: req.body.uid };

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                likeAry = result.like;
                likeAry = likeAry.filter( (item) => {
                    return item.aid != req.body.aid;
                });
            }

            return(
                User.findOneAndUpdate( info, { like: likeAry } )
                    .updateAsync()
            );
        })
        .then( (result) => {
            debug('[DELETE] 刪除收藏文章 success ->', result);
            res.json(result);
            return;
        })
        .catch( (err) => {
            debug('[DELETE] 刪除收藏文章 fail ->', err);
            return next(err);
        });
});

module.exports = router;
