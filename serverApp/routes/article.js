var express = require('express');
var router = express.Router();

var models = require('../models/article.js');

/*
 * [POST] 新增使用者
 * request : name, email, pwd
 * respone : db result
 */
router.post('/', function(req, res, next) {

    //先將傳過來的資料做成資料庫物件
    // var user = new models.User({ });

    //儲存到資料庫
    // user.save(function(err, result) {

    //     if (err) {
    //         console.log('[TEST] create test user FAIL, err ->', err);
    //         res.json(err);
    //     } else {
    //         res.json(result);
    //     }
    // });
});


module.exports = router;
