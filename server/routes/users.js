var express = require('express');
var router = express.Router();
var models = require('../models/user.js');

/*
 * create test user
 */
router.get('/test', function(req, res, next) {

    var user = new models.user({
    	email : 'chenpoanandrew@gmail.com',
        name : 'AndrewChen',
        pwd : '123'
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

module.exports = router;
