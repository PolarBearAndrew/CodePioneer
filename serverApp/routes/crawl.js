var request = require("request");
var Article = require('../models/article.js');

function crawl(){


	this.start = function(){

		// setInterval(function(){
		// 	console.log('tick');
		// }, (1000) ); //5 min

		/*
		 * Hacker News
		 */
		request("https://www.kimonolabs.com/api/2ydhrtbc?apikey=YTFXE6bo643qztfqtgMJxbTghxkihceB",
		    function(err, res, data) {

                data = JSON.parse(data);

                data.results.collection1.forEach(function( item ){

			        var article = new Article({
                        //title
				        title: item.title.text,
                        //文章的url
					    url: item.title.href,
                        //作者
					    author: item.users.text,
                        //來源
                        from: 'Hakcer News',
                        //
					    describe: '',
					    info: [
                            item.comments.text,
                            item.comments.href,
					    	item.points
					    ]
				    });

				    //儲存到資料庫
				    article.save(function(err, result) {
				        if (err)
				        	console.log('[TEST] create article FAIL, err ->', err);
				    });
                });
		});

		/*
		 * Github top 100
		 */
	};
}


module.exports = crawl;
