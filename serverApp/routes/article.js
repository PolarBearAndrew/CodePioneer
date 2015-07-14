var express = require('express');
var router = express.Router();

var user = require('../models/user.js').User;
var article = require('../models/article.js').Article;

var models = {
	User: user,
	Article: article
}
/*
 * [POST] 新增收藏文章
 * request : myid, aid
 * respone :
 */
router.post('/', function(req, res, next) {

	var info = { _id: req.body.myid };

    models.User.findOne( info, function(err, result) {

        if (err) {
            console.log('[ERROR] user find fail, err ->', err);
            res.json(err);
        }else{
        	if(result){

        		//處理需要更新的資料
	        	var updateData = { like: result.like };
	        	updateData.like.push( req.body.aid );

	        	models.User.update( info, updateData, function(err, result) {

	    		    if (err) {
			            console.log('[ERROR] user like update fail, err ->', err);
			            res.json(err);
			        } else {
			            res.json(result);
			        }
	        	});
        	}else{
        		//no result
        		res.json({ like: false });
        	}

        }
    });
});

/* [POST] 查詢別人(uid)收藏的
 * request : uid, myid
 * respone : db result
 */
router.post('/?uid', function(req, res, next) {


});

module.exports = router;
