var express = require('express');
var router = express.Router();
var models = require('../models/user.js');

/*
 * [POST] create test user
 */
router.post('/test', function(req, res, next) {

    var user = new models.User({
        email: 'chenpoanandrew@gmail.com',
        name: 'AndrewChen',
        pwd: '123'
    });

    user.save(function(err, result) {
        if (err) {
            console.log('[TEST] create test user FAIL, err ->', err);
            //res.json( err );

        } else {
            //console.log('[TEST] create test user success, result ->', result);
            res.json(result);
        }
    });
});


/*
 * [POST] 新增使用者
 */

//req  request 請求
//res  respone 回應

//post過來的參數 用req.body.xxx去找
//get的參數 用req.query.xxx去找

router.post('/', function(req, res, next) {

    //先將傳過來的資料做成資料庫物件
    var user = new models.User({
        email: req.body.email,
        name: req.body.name,
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
            //console.log('[TEST] create test user success, result ->', result);
            res.json(result);
        }
    });
});

/*
 * [POST] 登入檢查
 * input : email , pwd
 * return : { login : true || false  }
 */
router.post('/login', function(req, res, next) {

    var info = {
        email : req.body.email,
        pwd : req.body.pwd
    }

    models.User.find( info, function(err, result) {

        if (err) {
            console.log('[POST] login FAIL, err ->', err);
            res.json({ login : false });

        } else {

            if ( result.length === 1 ){
                res.json({ login : true });
                //console.log('[POST] login success', result);
            }else{
                res.json({ login : false });
            }


        }
    });
});

module.exports = router;
