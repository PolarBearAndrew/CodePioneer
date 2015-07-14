var request = require("request");
var models = require('../models/user.js');

function crawl(){


	this.start = function(){
		// setInterval(function(){
		// 	console.log('tick');
		// }, (1000) ); //5 min
		//
		request("https://www.kimonolabs.com/api/2ydhrtbc?apikey=YTFXE6bo643qztfqtgMJxbTghxkihceB",
		    function(err, res, result) {
		        //console.log(body);

		        //將result中的資料 以Aricle的格式塞到mongodb裡面
		        //1.把user換成article
		        //2.在json找出有價值的資料,塞到對應的欄位中
		        //3.先想辦法塞入一筆資訊


		        //for(collection跑完)
		        //先將傳過來的資料做成資料庫物件
			    var user = new models.User({
			        title: result.collection[0].title,
			        email: req.body.email,
			        pwd: req.body.pwd
			    });

			    //儲存到資料庫
			    user.save(function(err, result) {

			        if (err) {
			            console.log('[TEST] create test user FAIL, err ->', err);
			            res.json(err);
			        } else {
			            res.json(result);
			        }
			    });


		});
	};
}


module.exports = crawl;
