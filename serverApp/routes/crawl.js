var request = require("request");
var models = require('../models/article.js');

function crawl(){


	this.start = function(){
		// setInterval(function(){
		// 	console.log('tick');
		// }, (1000) ); //5 min
		//
		request("https://www.kimonolabs.com/api/2ydhrtbc?apikey=YTFXE6bo643qztfqtgMJxbTghxkihceB",
		    function(err, res, data) {

                data = JSON.parse(data);

                data.results.collection1.forEach(function( item ){

			        var article = new models.Article({
				        title: item.title.text,
					    url: item.title.href,
					    author: item.users.text,
					    describe: item.comments.href,
	                    //rank命名錯誤　命危pank
					    rank: item.pank,
					    info: [
					    	item.title.text,
					    	item.title.href
					    ]
				    });

				    //儲存到資料庫
				    article.save(function(err, result) {

				        if (err) console.log('[TEST] create article FAIL, err ->', err);
				    });
                });


		});
	};
}


module.exports = crawl;
