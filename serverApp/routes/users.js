var express = require('express');
var router = express.Router();
var models = require('../models/user.js');
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

    //先將傳過來的資料做成資料庫物件
    var user = new models.User({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd
    });

    if(!req.body.email || !req.body.name || !req.body.pwd){
        res.json( { err : '資料不完全' } );
    }

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


module.exports = router;
