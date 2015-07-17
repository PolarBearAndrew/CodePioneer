//express
var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var postMan = require('./mail.js');
var debug = require('debug')('API:');
//=================================================


/*
 * [POST] 新增使用者
 * request : name, email, pwd
 * respone : db result
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增使用者', 'req.body->', req.body );

    if(!req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
        return;
    }

    //先將傳過來的資料做成資料庫物件
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
        likeArticle: [],
        whoLikeMe: []

    });

    //儲存到資料庫
    user.save(function(err, result) {

        if (err) {
            console.log('[TEST] create test user FAIL, err ->', err);
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

/*
 * [GET] 查詢使用者
 * request : _id
 * respone : name, email, pwd
 */
router.get('/', function(req, res, next) {

    debug('[GET] 查詢使用者', 'req.body->', req.body );

    if(!req.body.uid){
        res.json( { err : '資料不完全' } );
        return;
    }

    User.findOne({ _id : req.body.uid }, function(err, result) {
        if(err){
            res.json({ result: null });
        }else{
            res.json(result);
        }
    });
});

/*
 * [PUT] 修改使用者
 * request : _id, name, email ,pwd
 * respone : db result
 */
router.put('/',  function(req, res, next) {

    debug('[PUT] 修改使用者', 'req.body->', req.body );

    if(!req.body._id || !req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
        return;
    }

    var info = {
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd
    }

    User.update({_id : req.body._id}, info, function(err, result) {
        if(err){
            console.log('update user FAIL, err ->', err);
            res.json({ err: err });
        }else{
            res.json(info);
        }
    });
});


/*
 * [DELETE] 刪除使用者
 * request : _id
 * respone : db result
 */
router.delete('/', function(req, res, next) {

    debug('[DELETE] 刪除使用者', 'req.body->', req.body );

    if(!req.body.uid){
        res.json( { err : '資料不完全' } );
        return;
    }

    User.remove({ _id : req.body.uid }, function(err, result) {
        if(err){
            console.log('delete user FAIL, err ->', err);
            res.json({ err: err });
        }else{
            res.json(result);
        }
    });
});

/*
 * [POST] 登入檢查
 * request : email, pwd
 * respone : { login : true || false, _id : _id  }
 */
router.post('/login', function(req, res, next) {

    debug('[POST] 登入檢查', 'req.body->', req.body );

    var info = {
        email : req.body.email,
        pwd : req.body.pwd
    }

    User.findOne( info, function(err, result) {

        if (err) {
            console.log('[POST] login FAIL, err ->', err);
            res.json({ login : false });

        }else{
            if ( result ){
                res.json({
                    login : true,
                    _id : result._id
                });
            }else{
                res.json({ login : false });
            }
        }
    });
});


/*
 * [GET] 取回密碼
 * request : email
 * respone : { sendMail : true || false }
 */
router.get('/pwd', function(req, res, next){

    debug('[GET] 取回密碼', 'req.body->', req.body );

    var email = { email: req.query.email };

    User.findOne( email, function(err, result) {

        if (err) {
            console.log('[POST] login FAIL, err ->', err);
            res.json({ sendMail : false });

        }else{
            if ( result ){

                console.log(result);

                var mailer = new postMan();
                mailer.sendTo( result.email, result.pwd );
                res.json({ sendMail : true });

            }else{
                res.json({ sendMail : false });
            }
        }
    });
});

module.exports = router;
