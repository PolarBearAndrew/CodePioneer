// DEMO promise

/*
 * [POST] 新增收藏文章
 * params : body.uid
 * params : body.aid
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增收藏文章 req.body ->', req.body );

    //validate
    let miss = check( req.body, ['uid', 'aid'] );
    if(!miss.check){
        debug('[POST] 新增收藏文章 miss data ->', miss.missData);
        return next(err);
    }

    //tmp variable & destination info
    let likeAry = [];
    let followerCount = 0;
    let info = { _id: req.body.uid };

    //DB operation
    User.findOne(info)
        .execAsync()
        .then( result => {

            if(result){
                likeAry = result.like;
                likeAry.push(req.body.aid);
                followerCount = parseInt(result.follow.length) || 0;
            }
            return User.findOneAndUpdate( info, { like : likeAry } )
                       .updateAsync();
        })
        .then( result => {
            debug('[POST] 新增收藏文章 success ->', result);
            res.json(req.body.aid);
            return Article.findOneAndUpdate(
                                { _id : req.body.aid },
                                { $inc :
                                    { rank : followerCount + 1 }
                                })
                          .updateAsync();
        })
        .catch( err => {
            debug('[POST] 新增收藏文章 fail ->', err);
            return next(err);
        })
        .then( result => {
            debug('finish 領頭羊演算法');
        })
        .catch( err => {
            debug('[POST] 新增收藏文章-領頭羊演算法 fail ->', err);
            return next(err);
        });
});


// DEMO callback


/*
 * [POST] 新增收藏文章
 * params : body.uid
 * params : body.aid
 */
router.post('/', function(req, res, next) {

    debug('[POST] 新增收藏文章 req.body ->', req.body );

    //validate
    let miss = check( req.body, ['uid', 'aid'] );
    if(!miss.check){
        debug('[POST] 新增收藏文章 miss data ->', miss.missData);
        return next(err);
    }

    //tmp variable & destination info
    let likeAry = [];
    let followerCount = 0;
    let info = { _id: req.body.uid };

    //DB operation
    User.findOne( info, function( err, result ){

        if(err){
            debug('[POST] 新增收藏文章 fail ->', err);
            return next(err);
        }else{
            if(result){
                likeAry = result.like;
                likeAry.push(req.body.aid);
                followerCount = parseInt(result.follow.length) || 0;
            }
            User.findOneAndUpdate( info, { like : likeAry }, function( err2, updateUserResult ){
                if(err){
                    debug('[POST] 新增收藏文章 fail ->', err2);
                    return next(err2);
                }else{
                    Article.findOneAndUpdate(
                        { _id : req.body.aid },
                        { $inc : { rank : followerCount + 1 } }, function( err3, udpateArticleResult){
                            if(err3){
                                debug('[POST] 新增收藏文章 fail ->', err3);
                                return next(err3);
                            }else{
                                debug('[POST] 新增收藏文章 success ->', result);
                                return res.json(req.body.aid);
                            }
                        })
                }
            })
        }
    });
});