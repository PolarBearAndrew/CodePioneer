var request = require("request");
var models = require('../models/user.js');

function crawl(){


	this.start = function(){
		// setInterval(function(){
		// 	console.log('tick');
		// }, (1000) ); //5 min
		//
		request("https://www.kimonolabs.com/api/2ydhrtbc?apikey=YTFXE6bo643qztfqtgMJxbTghxkihceB",
		    function(err, res, data) {
            
                data = JSON.parse(data);
            
		        var article = new models.Article({
			        title: data.results.collection1[1].title.text,
				    url: data.results.collection1[1].title.href,
				    author: data.results.collection1[1].users.text,
				    describe: data.results.collection1[1].comments.href,
                    //rank命名錯誤　命危pank
				    rank: data.results.collection1[1].pank,
				    info: [data.results.collection1[1].title.text, data.results.collection1[1].title.href]
			    });

			    // //儲存到資料庫
			    article.save(function(err, result) {

			        if (err) {
			            console.log('[TEST] create article FAIL, err ->', err);
			        } else {
			            console.log(result);
			        }
			    });
		});
	};
}


module.exports = crawl;
