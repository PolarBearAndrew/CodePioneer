var express = require('express');
var router = express.Router();
var debug = require('debug')('API');

var models = {
	User: require('../models/user.js'),
	Article: require('../models/article.js')
}

/*
 * [POST] 新增文章
 * request :
 * respone :
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增文章', 'req.body->', req.body );

    var article = new models.Article({
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        from: req.body.from,
        describe: req.body.describe,
        info: req.body.info
    });

    article.save(function(err, result) {
        if (err) {
            console.log('[TEST] create test user FAIL, err ->', err);
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

/*
 * [GET] 查詢文章
 * request : aid
 * respone :
 */

/*
 * [GET] 查詢最新文章(10)
 * request :
 * respone :
 */

/*
 * [GET] 查詢最新文章(n)
 * request :
 * respone :
 */

/*
 * [PUT] 修改文章
 * request :
 * respone :
 */

/*
 * [DELETE] 刪除文章
 * request :
 * respone :
 */

module.exports = router;