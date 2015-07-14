var express = require('express');
var router = express.Router();

var models = require('../models/article.js');


/*
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
});


module.exports = router;
