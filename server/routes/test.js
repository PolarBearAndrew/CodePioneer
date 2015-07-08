var express = require('express');
var router = express.Router();

/* Test API  */
// get , post , put , delete
router.get('/user', function(req, res, next) {

    res.send({
        15: 'Ray',
        12: 'Andrew'
    });

});

//輸入url : http://localhost:3333/API/user/login
//回答我 { login : true }

module.exports = router;
