var express = require('express');
var router = express.Router();

var models = {
	User: require('../models/user.js'),
	Article: require('../models/article.js')
}

/*
 * [POST] 新增文章
 * request : 
 * respone : 
 */
router.get('/', function(req, res, next) {
    var article = new Article({
        title: req.body.name,
        author: req.body.email,
        pwd: req.body.pwd,
        likeArticle: [],
        whoLikeMe: []

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