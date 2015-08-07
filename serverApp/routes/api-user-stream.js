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
            .limit(10)
            .sort({ lastLoginTime: -1 })
            .execAsync()
            .then( result => {
                debug('[GET] 查詢使用者(10) success ->', result);
                res.json( result );
                return;
            })
            .catch( err =>{
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
    let count = ( parseInt(finalIndex) + 10 );//

    //db operation
    User.find()
        .limit(count)
        .where('time <= ' + req.query.lastestTime)
        .sort({ time: -1 })
        .execAsync()
        .then( result => {

            let data = result.filter( (value, index) => {
                return index >= finalIndex;
            });

            debug('接續查詢使用者(10) success (data) ->', data);

            res.json( data );
            return;
        })
        .catch( err =>{
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
    let miss = check( req.body, ['uid', 'finalIndex', 'lastestTime'] );
    if(!miss.check){
        debug('[GET] 接續查詢喜愛使用者(10) miss data ->', miss.missData);
        return next(err);
    }

    let finalIndex = req.query.finalIndex;
    let count = ( parseInt(finalIndex) + 10 );

    //db operation
    // User.find()
    //     .where('_id').in(req.query.uid)
    //     .limit(10)
    //     .sort({ time: -1 })
    //     .execAsync()
    //     .then( result => {

    //         console.log('hiiii!!!');

    //         debug('[GET] 查詢喜愛使用者(10) success ->', result);
    //         res.json( result );
    //         return;
    //     })
    //     .catch( err =>{
    //         debug('[GET] 查詢喜愛使用者(10) fail ->', err);
    //         return next(err);
    //     });
});


module.exports = router;