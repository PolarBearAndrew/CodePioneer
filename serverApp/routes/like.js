var express = require('express');
var router = express.Router();

var models = {
	User: require('../models/user.js'),
	Article: require('../models/article.js')
}
/*
 * [POST] 新增收藏文章
 * request : uid, aid
 * respone : { err: false }
 */
router.post('/', function(req, res, next) {

    if( !req.body.uid || !req.body.aid ){
        res.json( { err : '資料不完全' } );
        return;
    }

	var info = { _id: req.body.uid };

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
        		res.json({ err: 'false' });
        	}

        }
    });
});

/*
 * [GET] 查詢收藏文章
 * request : uid
 * respone : { likeArticle: null }
 */
router.get('/', function(req, res, next) {
    
    if(!req.body.uid){
        res.json( { err : '資料不完全' } );
        return;
    }

    var info = { _id: req.body.uid };

    models.User.findOne( info, function(err, result) {

        if (err) {
            console.log('[ERROR] user find fail, err ->', err);
            res.json(err);
        }else{
        	if(result){
                res.json({ likeArticle: result.likeArticle });
        	}else{
        		//no result
        		res.json({ likeArticle: null });
        	}

        }
    });
});

/*
 * [DELETE] 刪除收藏文章
 * request : aid
 * respone : { err: false }
 */
router.delete('/', function(req, res, next) {

	    if(!req.body.uid || !req.body.aid){
        res.json( { err : '資料不完全' } );
        return;
    }

	var info = { _id: req.body.uid };

    models.User.findOne( info, function(err, result) {

        if (err) {
            console.log('[ERROR] user find fail, err ->', err);
            res.json(err);
        }else{

        	if(result){
        		//處理需要更新的資料
	        	var updateData = { likeArticle: result.likeArticle };
	        	updateData.likeArticle.remove( req.body.aid );
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
        		res.json({ err: false });
        	}

        }
    });
});

module.exports = router;
