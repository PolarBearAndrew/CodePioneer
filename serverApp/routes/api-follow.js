//express
let express = require('express');
let router = express.Router();

//debug
let debug = require('debug')('API:follow');

//model
let User = require('../models/user.js');
let Article = require('../models/article.js');

//feature
let checkPorperty = require('../feature/checkPorperty.js');
let check = checkPorperty.check;

/*
 * [POST] 新增追蹤
 * request : uid
 * respone : { err: false }
 */
router.post('/', (req, res, next) => {

    debug('[POST] 新增追蹤 req.body ->', req.body );

    //check
    let miss = check( req.body, ['uid'] );
    if(!miss.check){
        debug('[POST] 新增追蹤 miss data ->', miss.missData);
        return next(err);
    }

    //tmp variable, destination info
    let followAry ;
    let info = { _id: req.body.uid };

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                followAry = result.follow;
                followAry.push( { follow: req.body.uid });
            }

            return(
                User.findOneAndUpdate( info, { follow: followAry } )
                    .updateAsync()
            );
        })
        .then( (result) => {
            debug('[POST] 新增追蹤 success ->', result);
            res.json(result);
            return;
        })
        .catch( (err) => {
            debug('[POST] 新增追蹤 fail ->', err);
            return next(err);
        });
});

/*
 * [GET] 查詢追蹤
 * request : uid
 * respone :
 */
router.get('/', function(req, res, next) {

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
    User.findOne(info)
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
 * [DELETE] 取消追蹤
 * request : uid
 * respone :
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 取消追蹤 req.body ->', req.body );

    //check
	let miss = check( req.body, ['uid'] );
    if(!miss.check){
        debug('[DELETE] 取消追蹤 miss data ->', miss.missData);
        return next(err);
    }

    //tmp variable, destination info
    let followAry;
    let info = { _id: req.body.uid };

    //db operation
    User.findOne(info)
        .execAsync()
        .then( (result) => {

            if(result){
                followAry = result.follow;
                followAry = followAry.filter( (item) => {
                    return item.follow != req.body.follow;
                });
            }

            return(
                User.findOneAndUpdate( info, { follow: followAry } )
                    .updateAsync()
            );

        })
        .then( (result) => {
            debug('[DELETE] 取消追蹤 success ->', result);
            res.json(result);
            return;
        })
        .catch( (err) => {
            debug('[DELETE] 取消追蹤 fail ->', err);
            return next(err);
        });
});

module.exports = router;
