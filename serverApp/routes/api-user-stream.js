//express
let express = require('express');
let router = express.Router();

//debug
let debug = require('debug')('API:user');

//model
let User = require('../models/user.js');

//feature
let postMan = require('../feature/mail.js');
let checkPorperty = require('../feature/checkProperty.js');
let check = checkPorperty.check;

/*
 * [GET] 查詢使用者(10)
 * request :
 * respone : db result
 */
router.get('/', (req, res, next) => {

    debug('[GET] 查詢使用者(10) req.body ->', req.body );

    //no check

    //db operation
    User.find()
            // .limit(10)
            .sort({ lastLoginTime: -1 })
            .execAsync()
            .then( (result) => {
                debug('[GET] 查詢使用者(10) success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 查詢使用者(10) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 接續查詢使用者(10)
 * request : query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/stream', (req, res, next) => {

    //check
    let miss = check( req.query, ['finalIndex', 'lastestTime'] );
    if(!miss.check){
        debug('接續查詢使用者(10) miss data ->', miss.missData);
        return next(err);
    }

    let finalIndex = req.query.finalIndex;
    let count = ( parseInt(finalIndex) + 10 );

    //db operation
     User.find()
            .limit(count)
            .where('time <= ' + req.query.lastestTime)
            .sort({ time: -1 })
            .execAsync()
            .then( (result) => {

                let data = result.filter( (value, index) => {
                    return index >= finalIndex;
                });

                debug('接續查詢使用者(10) success (data) ->', data);

                res.json( data );
                return;
            })
            .catch( (err) =>{
                debug('接續查詢使用者(10) fail ->', err);
                return next(err.message);
            });
});

/*
 * [GET] 查詢喜愛使用者(10)
 * request : body.uid
 * respone : db result
 */
router.get('/like', (req, res, next) => {

    //check
    let miss = check( req.body, ['uid'] );
    if(!miss.check){
        debug('[GET] 查詢喜愛使用者(10) miss data ->', miss.missData);
        return next(err);
    }

    //db operation
     User.find()
            .limit(10)
            .where('_id').in(req.body.uid)
            .sort({ time: -1 })
            .execAsync()
            .then( (result) => {

                debug('[GET] 查詢喜愛使用者(10) success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 查詢喜愛使用者(10) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 接續查詢喜愛使用者(10)
 * request : body.uid, query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/like/stream', (req, res, next) => {

    //check
    let miss = check( req.body, ['uid'] );
    if(!miss.check){
        debug('[GET] 接續查詢喜愛使用者(10) miss data ->', miss.missData);
        return next(err);
    }
    let mis = check( req.query, ['finalIndex', 'lastestTime'] );
    if(!mis.check){
        debug('[GET] 接續查詢喜愛使用者(10) miss data ->', miss.missData);
        return next(err);
    }

    let finalIndex = req.query.finalIndex;
    let count = ( parseInt(finalIndex) + 10 );

    //db operation
     User.find()
            .limit(count)
            .where('_id').in(req.body.uid)
            .where('time <= ' + req.query.lastestTime)
            .sort({ time: -1 })
            .execAsync()
            .then( (result) => {

                debug('[GET] 接續查詢喜愛使用者(10) success ->', result);
                res.json( result );
                return;
            })
            .catch( (err) =>{
                debug('[GET] 接續查詢喜愛使用者(10) fail ->', err);
                return next(err);
            });
});

/*
 * [GET] 查詢追蹤使用者(10)
 * request : body.uid
 * respone : db result
 */
router.get('/follow', (req, res, next) => {
    debug('[GET] 查詢追蹤 req.body ->', req.body );

    //check
    let miss = check( req.body, ['uid'] );
    if(!miss.check){
        debug('[GET] 查詢追蹤 miss data ->', miss.missData);
        return next(err);
    }

    //destination info
    var info = { _id: req.body.uid };

    //db operation
    User.find(info)
        .limit(10)
        .execAsync()
        .then( (result) => {
            debug('[GET] 查詢追蹤 success ->', result);
            res.json(result);
            return;
        })
        .catch( (err) => {
            debug('[GET] 查詢追蹤 fail ->', err);
            return next(err);
        });
});

/*
 * [GET] 接續查詢追蹤使用者(10)
 * request : body.uid, query.finalIndex, query.lastestTime
 * respone : db result
 */
router.get('/follow/stream', (req, res, next) => {

    debug('[GET] 查詢追蹤 req.body ->', req.body );

    //check
    let miss = check( req.body, ['uid'] );
    if(!miss.check){
        debug('[GET] 查詢追蹤 miss data ->', miss.missData);
        return next(err);
    }
    let mis = check( req.query, ['finalIndex', 'lastestTime'] );
    if(!mis.check){
        debug('[GET] 接續查詢喜愛使用者(10) miss data ->', miss.missData);
        return next(err);
    }

    let finalIndex = req.query.finalIndex;
    let count = ( parseInt(finalIndex) + 10 );

    //destination info
    var info = { _id: req.body.uid };

    //db operation
    User.find(count)
        .limit(10)
        .where('time <= ' + req.query.lastestTime)
        .execAsync()
        .then( (result) => {
            debug('[GET] 查詢追蹤 success ->', result);
            res.json(result);
            return;
        })
        .catch( (err) => {
            debug('[GET] 查詢追蹤 fail ->', err);
            return next(err);
        });
});

module.exports = router;