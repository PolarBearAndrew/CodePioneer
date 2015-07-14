var express = require('express');
var router = express.Router();

var models = require('../models/article.js');


/*
<<<<<<< HEAD
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
=======
 * [POST] 查詢別人(uid)收藏的
 * request : uid, aid
 * respone : db result
 */
router.post('/?uid', function(req, res, next) {

    var info = req.body.uid;

    models.Article.find( info, function(err, result) {
        if (err) {
            console.log('[ERROR] user find fail, err ->', err);
            res.json(err);
        } else {
            res.json(result);
        }
    });
>>>>>>> a947f66756f0bb8f261cc7e0efa3ac5c6a913c57
});


module.exports = router;
