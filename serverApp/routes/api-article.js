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

//sort

//=======================================================

/*
 * [POST] 新增文章
 * request : body.title, body.url, body.author, body.from
 *           body.describe, body.info
 * respone : db result
 */
router.post('/', (req, res, next) => {

    debug('[POST] 新增文章 req.body ->', req.body );

    //check
    let miss = check( req.body, ['title', 'url', 'author', 'from', 'describe'] );
    if(!miss.check){
        debug('[POST] 新增文章 miss data ->', miss.missData);
        return next(err);
    }

    //db entiry
    var article = new Article({
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        from: req.body.from,
        describe: req.body.describe,
        info: req.body.info
    });

    //db operation
     article.saveAsync()
            .spread( (result) => {
                debug('[POST] 新增文章 success ->', result);
                res.json(result);
                return;
            })
            .catch( (err) => {
                debug('[POST] 新增文章 fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢文章
 * request : body.aid
 * respone : db result
 */
router.get('/', (req, res, next) => {

    debug('[GET] 查詢文章 req.query ->', req.query );

    //check
    let miss = check( req.query, ['aid'] );
    if(!miss.check){
        debug('[GET] 查詢文章 miss data ->', miss.missData);
        return next(err);
    }

    //db operation
     Article.findOne()
            .where('_id').equals( req.query.aid )
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢文章 success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 查詢文章 fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢最新文章(10)
 * request :
 * respone : db result
 */
router.get('/news', (req, res, next) => {

    debug('[GET] 查詢最新文章(10) req.body ->', req.body );

    var data = null; //temp data for article list

    //db operation
     Article.find()
            .limit(10)
            .sort({ rank: -1 })
            .execAsync()
            .then( (result) => {
                // debug('[GET] 查詢最新文章(10) success ->', result);
                data = result;
                return User.find({}).execAsync();
            })
            .then( user => {
                data = data.map( art => {

                    //art.like.push('000');

                    // user = user.map( val => {

                    //     val.like = val.like.map( aid => {

                    //         // console.log('compair---', art._id + '---', aid + '---',  art._id.toString() === aid.toString())
                    //         if( art._id.toString() === aid.toString() ){

                    //             console.log('push',art._id, val.imgUrl);
                    //             // console.log('art~~1', art.like);
                    //             art.like = art.like.push(val.imgUrl.toString());
                    //             //art.like[0] =  val.imgUrl.toString();

                    //             // console.log('art~~2', art.like);
                    //             // console.log('art', art, art.like);
                    //         }
                    //         return aid;
                    //     });
                    //     return val;
                    // });

                    console.log('hi, I am here');

                    for (var i = user.length - 1; i >= 0; i--) {

                        for (var j = user[i].like.length - 1; j >= 0; j--) {

                            //console.log('--->', user[i].like[j].toString(), art._id.toString(), user[i].like[j].toString() === art._id.toString())

                            if( user[i].like[j].toString() === art._id.toString() ){
                                art.like.push(user[i].imgUrl.toString());
                            }
                        };
                    };
                    return art;
                })
                // console.log('-------data', data)
                return Promise.resolve('');
            })
            .then( () => {
                //console.log('data', data);
                res.json(data);
                return;
            })
            .catch( err =>{
                debug('[GET] 查詢最新文章(10) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢最新文章(n)
 * request :
 * respone : db result
 */
router.get('/news/:count', (req, res, next) => {

    debug('[GET] 查詢最新文章(n) req.body ->', req.body );

    //check
    let miss = check( req.params, ['count'] );
    if(!miss.check){
        debug('[GET] 查詢最新文章(n) miss data ->', miss.missData);
        return next(err);
    }

    let data = null; //temp data for article list

    //db operation
     Article.find()
            .limit(req.params.count)
            .sort({ rank: -1 })
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢最新文章(n) success ->', result);
                data = result.map( val => {
                    val.like = [];
                    return val;
                });
                return User.find({}).execAsync();
            })
            .then( user => {
                 return user.forEach( val => {
                            val.like.forEach( like => {
                                data.forEach( aid => {
                                    if( aid === like )
                                        data.like.push(val.imgUrl);
                                });
                            });
                        });
            })
            .then( () => {

                res.json(data);
                return;
            })
            .catch( err =>{
                debug('[GET] 查詢最新文章(n) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 接續查詢文章(10)
 * request : query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/stream', (req, res, next) => {

    let miss = check( req.query, ['finalIndex', 'lastestTime'] );
    if(!miss.check){
        debug('[GET] 接續查詢文章(10) miss data ->', miss.missData);
        return next(err);
    }

    let finalIndex = req.query.finalIndex;
    let count = ( parseInt(finalIndex) + 10 );
    let data = null; //temp data for article list

    //db operation
     Article.find()
            .limit(count)
            .where('time <= ' + req.query.lastestTime)
            .sort({ rank: -1 })
            .execAsync()
            .then( (result) => {

                data = result.filter( (value, index) => {
                    return index >= finalIndex;
                }).map( val => {
                    val.like = [];
                    return val;
                });

                //debug('[GET] 接續查詢文章(10) success (result) ->', result);
                debug('[GET] 接續查詢文章(10) success (data) ->', data);
                return User.find({}).execAsync();
            })
            .then( user => {
                 return user.forEach( val => {
                            val.like.forEach( like => {
                                data.forEach( aid => {
                                    if( aid === like )
                                        data.like.push(val.imgUrl);
                                });
                            });
                        });
            })
            .then( () => {

                res.json(data);
                return;
            })
            .catch( err =>{
                debug('[GET] 查詢最新文章(n) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢喜愛文章
 * request : body.like
 * respone : db result
 */
router.get('/like', (req, res, next) => {

    let miss = check( req.query, ['like'] );
    if(!miss.check){
        debug('[GET] 查詢喜愛文章(10) miss data ->', miss.missData);
        return next(err);
    }

    let like = req.query.like.split(',');

    //db operation
     Article.find()
            .where('_id').in(like)
            .sort({ rank: -1 })
            .execAsync()
            .then( (result) => {

                debug('[GET] 查詢喜愛文章(10) success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 查詢喜愛文章(10) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢追蹤者的喜愛文章
 * request : body.uid
 * respone : db result
 */
router.get('/follow/like', (req, res, next) => {

    let miss = check( req.query, ['uid'] );
    if(!miss.check){
        debug('[GET] 查詢追蹤者的喜愛文章 miss data ->', miss.missData);
        return next(err);
    }

    //db operation
    User.find({})
        .execAsync()
        .then( (result) => {

            let list = [];

            result.forEach( (value) => {
                if( value.follow.indexOf(req.query.uid) !== -1){
                    list = list.concat(value.like);
                }
            });

            debug('[GET] 查詢追蹤者的喜愛文章-取得追蹤名單 success(1) ->', list);

            return Article.find()
                          .where('_id').in(list)
                          .sort({ rank: -1 })
                          .execAsync();
        })
        .then( (result) => {
            debug('[GET] 查詢追蹤者的喜愛文章-取得文章 success(2) ->', result);
            res.json(result);
        })
        .catch( (err) =>{
            debug('[GET] 查詢追蹤者的喜愛文章 fail ->', err);
            return next(err);
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

    //check
    let miss = check( req.body, ['aid', 'title', 'url', 'author', 'from', 'describe', 'info'] );
    if(!miss.check){
        debug('[PUT] 修改文章資訊 miss data ->', miss.missData);
        return next(err);
    }

    //destination info
    let info = {
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        from: req.body.from,
        describe: req.body.describe,
        info: req.body.info
    };

    //db operation
    Article.findOneAndUpdate( { _id: req.body.aid }, info )
            .updateAsync()
            .then( (result) => {
                debug('[PUT] 修改文章資訊 success ->', result);
                res.json(result);
                return;
            })
            .catch( (err) => {
                debug('[PUT] 修改文章資訊 fail ->', err);
                return next(err);
            });
});

/*
 * [DELETE] 刪除文章
 * request : body.aid
 * respone : db result
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 刪除文章 req.body->', req.body );

    //check
    let miss = check( req.body, ['aid'] );
    if(!miss.check){
        debug('[PUT] 修改文章資訊 miss data ->', miss.missData);
        return next(err);
    }

    //db operation
    Article.findOneAndRemove( { _id: req.body.aid } )
            .removeAsync()
            .then( (result) => {
                debug('[DELETE] 刪除文章 success ->', result);
                res.json(result);
                return;
            })
            .catch( (err) => {
                debug('[DELETE] 刪除文章 fial ->', err);
                return next(err);
            });
});

module.exports = router;