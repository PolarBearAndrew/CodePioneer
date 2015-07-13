var express = require('express');
var router = express.Router();

var models = require('../models/user.js');
var postMan = require('./mail.js')
//req  request 請求
//res  respone 回應
//post過來的參數 用req.body.xxx去找
//get的參數 用req.query.xxx去找
//=============================================

/*
 * [POST] 新增使用者
 * request : name, email, pwd
 * respone : db result
 */
router.post('/', function(req, res, next) {

    if(!req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
    }

    //先將傳過來的資料做成資料庫物件
    var user = new models.User({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd
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
 * [PUT] 修改使用者
 * request : _id, name, email ,pwd
 * respone : db result
 */
router.put('/', function(req, res, next) {

    if(!req.body._id || !req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
    }
    
    var info = {
        name : req.body.name,
        email : req.body.email,
        pwd : req.body.pwd
    }

    models.User.update({_id : req.body._id}, info, function(err, result) {
        if(err){
            console.log('update user FAIL, err ->', err);
            res.json({ err: err });
        }else{
            res.json(info);
        }
    });
});

/*
 * [GET] 查詢使用者
 * request : _id
 * respone : name, email, pwd
 */
router.get('/', function(req, res, next) {
    
    if(!req.query._id){
        res.json( { err : '資料不完全' } );
    }

    models.User.find({ _id : req.query._id }, function(err, result) {
        if(err){
            console.log('find user FAIL, err ->', err);
            res.json({ err: err });
        }else{
            res.json(result);
        }
    });
});

/*
 * [DELETE] 刪除使用者
 * request : _id
 * respone : db result
 */
router.delete('/', function(req, res, next) {
    
    if(!req.body._id || !req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
    }

    models.User.delete({ _id : req.query._id }, function(err, result) {
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

    var info = {
        email : req.body.email,
        pwd : req.body.pwd
    }

    models.User.findOne( info, function(err, result) {

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

    models.User.findOne( req.query.email, function(err, result) {

        if (err) {
            console.log('[POST] login FAIL, err ->', err);
            res.json({ sendMail : false });

        }else{
            if ( result ){

                console.log('result', result);

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
