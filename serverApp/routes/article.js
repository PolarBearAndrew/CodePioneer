var express = require('express');
var router = express.Router();

var models = {
	User: require('../models/user.js'),
	Article: require('../models/article.js')
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
	        	var updateData = { likeArticle: result.likeArticle };
	        	updateData.likeArticle.push( req.body.aid );

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

/*
 * [GET] 查詢收藏文章
 * request :
 * respone :
 */
router.get('/', function(req, res, next) {

    var info = { _id: req.body.uid };

    models.User.findOne( info, function(err, result) {

        if (err) {
            console.log('[ERROR] user find fail, err ->', err);
            res.json(err);
        }else{
        	if(result){
                var infolink = { link: result.query
                                .link };
                models.User.findOne(infolink, function(err, result){
                    if (err) {
			            console.log('[ERROR] user like link fail, err ->', err);
			            res.json(err);
			        } else {
			            res.json(result);
			        }
                })
        	}else{
        		//no result
        		res.json({ link: false });
        	}

        }
    });
});

/*
 * [DELETE] 刪除收藏文章
 * request : aid
 * respone :
 */
router.delete('/', function(req, res, next) {

});

module.exports = router;
