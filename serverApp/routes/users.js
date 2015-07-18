//express
var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var postMan = require('./mail.js');
var debug = require('debug')('API:user');
// debug.log = console.error.bind(console);
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
    user.saveAsync()
        .then( (result) => {
            debug('result', result);
            res.json(result[0]);
        })
        .catch( (err) => {
            console.log('[TEST] create test user FAIL, err ->', err);
            res.json(err);
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

    User.findOne()
        .where('_id').equals( req.body.uid )
        .execAsync()
        .then( (result) => {
            res.json(result);
        })
        .catch( (err) => {
            debug('[GET] 查詢使用者 FAIL, err ->', err);
            res.json(err);
        });
});

/*
 * [PUT] 修改使用者
 * request : _id, name, email ,pwd
 * respone : db result
 */
router.put('/',  function(req, res, next) {

    debug('[PUT] 修改使用者', 'req.body->', req.body );

    if(!req.body.uid || !req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
        return;
    }

    var info = {
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd
    }

    User.findOneAndUpdate( {_id: req.body.uid }, info)
        .update()
        .then( (result) => {
            debug('[PUT] 修改使用者 success', result);
            res.json(result);
        })
        .catch( (err) => {
            debug('[PUT] 修改使用者 FAIL, err ->', err);
            res.json({err});
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

    User.findOneAndRemove( {_id: req.body.uid } )
        .remove()
        .then( (result) => {
            res.json(result);
        })
        .catch( (err) => {
            debug('[DELETE] 刪除使用者 FAIL, err ->', err);
            res.json({err});
        });
});

/*
 * [POST] 登入檢查
 * request : email, pwd
 * respone : { login : true || false, _id : _id  }
 */
router.post('/login', function(req, res, next) {

    debug('[POST] 登入檢查', 'req.body->', req.body );

    User.findOne()
        .where('email').equals( req.body.email )
        .where('pwd').equals( req.body.pwd )
        .execAsync()
        .then( (result) => {

            if(result){
                res.json({
                    login : true,
                    _id : result._id
                });
            }else{
                res.json({ login : false });
            }
        })
        .catch( (err) => {
            debug('[POST] 登入檢查 FAIL, err ->', err);
            res.json({ login : false });
        });
});


/*
 * [GET] 取回密碼
 * request : email
 * respone : { sendMail : true || false }
 */
router.get('/pwd', function(req, res, next){

    debug('[GET] 取回密碼', 'req.body->', req.body );

    User.findOne()
        .where('email').equals( req.query.email )
        .execAsync()
        .then( (result) => {

            if(result){
                var mailer = new postMan();
                mailer.sendTo( result.email, result.pwd );
                res.json({ sendMail : true });
            }else{
                res.json({ sendMail : false });
            }
        })
        .catch( (err) => {
            debug('[GET] 查詢使用者 FAIL, err ->', err);
            // res.json(err);
            res.json({ sendMail : false });
        });
});

module.exports = router;
