var express = require('express');
var router = express.Router();

var models = require('../models/article.js');

/*
 * [POST] 新增收藏文章
 * request : aid
 * respone : 
 */
router.post('/', function(req, res, next) {
    
    if(!req.body.aid){
        res.json( { err : '資料不完全' } );
    }

    //先將傳過來的資料做成資料庫物件
     var user = new models.User({
        link : req.body.aid
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


module.exports = router;
