var express = require('express');
var router = express.Router();
var models = require('../models/user.js');

/*
 * [POST] create test user
 */
router.post('/test', function(req, res, next) {

    var user = new models.User({
        email: 'chenpoanandrew@gmail.com',
        name: 'AndrewChen',
        pwd: '123'
    });

    user.save(function(err, result) {
        if (err) {
            console.log('[TEST] create test user FAIL, err ->', err);
            //res.json( err );

        } else {
            //console.log('[TEST] create test user success, result ->', result);
            res.json(result);
        }
    });
});


/*
 * [POST] 新增使用者
 */
router.post('/', function(req, res, next) {

    var user = new models.User({
        email: req.body.email,
        name: req.body.name,
        pwd: req.body.pwd
    });

    user.save(function(err, result) {
        if (err) {
            console.log('[TEST] create test user FAIL, err ->', err);
            //res.json( err );

        } else {
            //console.log('[TEST] create test user success, result ->', result);
            res.json(result);
        }
    });
});

/*
 * [POST] 登入檢查
 */
router.post('/login', function(req, res, next) {

    var info = {
        email : req.params.email,
        pwd : req.body.pwd
    }

    console.log('info', info);

    models.User.find( info, function(err, result) {

        if (err) {
            console.log('[POST] login FAIL, err ->', err);

        } else {

            if ( result.length == 1 ){
                res.json({ login : true });
                console.log('[POST] login success', result);
            }else{
                res.json({ login : false });
            }


        }
    });
});

module.exports = router;
