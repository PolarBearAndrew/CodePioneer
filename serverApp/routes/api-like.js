//express
var express = require('express');
var router = express.Router();

//debug
var debug = require('debug')('API:like');

//model
var User = require('../models/user.js');
var Article = require('../models/article.js');

// bluebird.reject( new Error('xxxxxx') ); //reject : 直接讓promise物件thorw err到catch中
// return bluebird.resolve(data); //resolve包裝一個promise物件,return到下一個then

/*
 * [POST] 新增收藏文章
 * request : uid, aid
 * respone : { err: false }
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增收藏文章 req.body ->', req.body );

    //check
    if( !req.body.uid || !req.body.aid ){
        res.json( { err : '資料不完全' } );
        return;
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
        })
        .catch( (err) => {
            debug('[POST] 新增收藏文章 fail ->', err);
            next(err);
        });
});

/*
 * [GET] 查詢收藏文章
 * request : uid
 * respone : like
 */
router.get('/', function(req, res, next) {

    debug('[GET] 查詢收藏文章 req.body ->', req.body );

    //check
    if(!req.body.uid){
        res.json( { err : '資料不完全' } );
        return;
    }

    //destination info
    var info = { _id: req.body.uid };

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {
            debug('[POST] 查詢收藏文章 success ->', result);
            res.json(result);
        })
        .catch( (err) => {
            debug('[POST] 查詢收藏文章 fail ->', err);
            next(err);
        });
});

/*
 * [DELETE] 刪除收藏文章
 * request : aid
 * respone : { err: false }
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 刪除收藏文章 req.body ->', req.body );

    //check
	if(!req.body.uid || !req.body.aid){
        res.json( { err : '資料不完全' } );
        return;
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
            }else{
               //這樣等於錯誤
            }

            return(
                User.findOneAndUpdate( info, { like: likeAry } )
                    .updateAsync()
            );

        })
        .then( (result) => {
            debug('[DELETE] 刪除收藏文章 success ->', result);
            res.json(result);
        })
        .catch( (err) => {
            debug('[DELETE] 刪除收藏文章 fail ->', err);
            next(err)
        });
});

module.exports = router;
