var express = require('express');
var router = express.Router();
var debug = require('debug')('API:like');

var models = {
	User: require('../models/user.js'),
	Article: require('../models/article.js')
}

var User = require('../models/user.js');
var Article = require('../models/article.js');

/*
 * [POST] 新增收藏文章
 * request : uid, aid
 * respone : { err: false }
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增收藏文章', 'req.body->', req.body );

    if( !req.body.uid || !req.body.aid ){
        res.json( { err : '資料不完全' } );
        return;
    }

    let likeAry ;
    let info = { _id: req.body.uid };

    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                likeAry = result.like;
                likeAry.push( { aid: req.body.aid });
            }
        })
        .then( () => {

            User.findOneAndUpdate( info, { like: likeAry } )
                .update()
                .then( (result) => {

                    res.json(result);
                });
        })
        .catch( (err) => {
            debug('[POST] 新增收藏文章 FAIL, err ->', err);
            res.json({err});
        });
});

/*
 * [GET] 查詢收藏文章
 * request : uid
 * respone : { likeArticle: null }
 */
router.get('/', function(req, res, next) {

    debug('[GET] 查詢收藏文章', 'req.body->', req.body );

    if(!req.body.uid){
        res.json( { err : '資料不完全' } );
        return;
    }

    var info = { _id: req.body.uid };

    User.findOne(info)
        .execAsync()
        .then( (result) => {
            res.json(result);
        })
        .catch( (err) => {
            debug('[POST] 新增收藏文章 FAIL, err ->', err);
            res.json({err});
        });
});

/*
 * [DELETE] 刪除收藏文章
 * request : aid
 * respone : { err: false }
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 刪除收藏文章', 'req.body->', req.body );

	if(!req.body.uid || !req.body.aid){
        res.json( { err : '資料不完全' } );
        return;
    }

    let likeAry;
    let info = { _id: req.body.uid };

    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                likeAry = result.like;
                likeAry = likeAry.filter( (item) => {
                    return item.aid != req.body.aid;
                });
            }
        })
        .then( () => {

            User.findOneAndUpdate( info, { like: likeAry } )
                .update()
                .then( (result) => {

                    res.json(result);
                });
        })
        .catch( (err) => {
            debug('[DELETE] 刪除收藏文章 FAIL, err ->', err);
            res.json({err});
        });
});

module.exports = router;
