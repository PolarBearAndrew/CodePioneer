var express = require('express');
var router = express.Router();
var models = require('../models/user.js');

/*
 * create test user
 */
router.get('/test', function(req, res, next) {

    var user = new models.user({
        id: '101111212',
        name: 'AndrewChen'
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
