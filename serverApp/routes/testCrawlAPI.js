var express = require('express');
var router = express.Router();
var request = require("request");
var models = require('../models/article.js');


router.get('/', function(req, res, next) {

	console.log('i am here');

    //Hacker News
	request("https://www.kimonolabs.com/api/2ydhrtbc?apikey=YTFXE6bo643qztfqtgMJxbTghxkihceB",
	    function(err, respone, result) {
	        res.json(result);
	});
    
    //TOP10
    request("https://www.kimonolabs.com/api/dbtomjx4?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
	    function(err, respone, result) {
	        res.json(result);
	});
});

module.exports = router;

