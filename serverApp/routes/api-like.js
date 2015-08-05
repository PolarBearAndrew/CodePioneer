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
    let followerCount = 0;

    //db operation
    User.findOne(info)
        .execAsync()
        .then( result => {

            if(result){
                likeAry = result.like;
                likeAry.push(req.body.aid);
                followerCount = parseInt(result.follow.length) || 0;
            }
            return User.findOneAndUpdate( info, { like: likeAry } )
                       .updateAsync();
        })
        .then( result => {
            debug('[POST] 新增收藏文章 success ->', result);
            res.json(req.body.aid);
            return Article.findOneAndUpdate( { _id: req.body.aid }, { $inc: { rank: followerCount + 1 }} )
                          .updateAsync();
        })
        .catch( err => {
            debug('[POST] 新增收藏文章 fail ->', err);
            return next(err);
        })
        .then( result => {
            console.log('finish 領頭羊演算法');
        })
        .catch( err => {
            debug('[POST] 新增收藏文章-領頭羊演算法 fail ->', err);
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
    let data = [];

    //db operation
    User.findOne(info)
        .execAsync()
        .then( result => {

            return Article.find()
                          .where('_id').in(result.like)
                          .execAsync();
        })
        .then( result => {
            data = result;
            return User.find({}).execAsync();
        })
        .then( user => {
            data = data.map( art => {

                for (var i = user.length - 1; i >= 0; i--) {
                    for (var j = user[i].like.length - 1; j >= 0; j--) {
                        if( user[i].like[j].toString() === art._id.toString() ){
                            art.like.push(user[i].imgUrl.toString());
                        }
                    };
                };
                return art;
            })

            return Promise.resolve('');
        })
        .then( () => {
            debug('[GET] 查詢收藏文章 success ->', data);
            res.json(data);
            return;
        })
        .catch( err => {
            debug('[GET] 查詢收藏文章 fail ->', err);
            return next(err);
        });
});

/*
 * [DELETE] 刪除收藏文章
 * request : body.aid, body.uid
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
    let followerCount = 0;

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                likeAry = result.like;
                likeAry = likeAry.filter( val => {
                    return val != req.body.aid;
                });
            }

            return(
                User.findOneAndUpdate( info, { like: likeAry } )
                    .updateAsync()
            );
        })
        .then( (result) => {
            debug('[DELETE] 刪除收藏文章 success ->', result);
            res.json(req.body.aid);
            return Article.findOneAndUpdate( { _id: req.body.aid }, { $inc: { rank: (followerCount + 1) * -1 }} )
                          .updateAsync();
        })
        .catch( (err) => {
            debug('[DELETE] 刪除收藏文章 fail ->', err);
            return next(err);
        })
        .then( result => {})
        .catch( err => {
            debug('[DELETE] 刪除收藏文章-領頭羊演算法 fail ->', err);
            return next(err);
        });
});

module.exports = router;
