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
                        //描述
					    describe: '',
                        //一些小資訊
					    info: [
                            //討論區有多少回應的名稱
                            item.comments.text,
                            //連接到討論區
                            item.comments.href,
                            //多少人點閱
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
		 * Github top 10
		 */
            request("https://www.kimonolabs.com/api/2wne1unk?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
		    function(err, res, data) {

                data = JSON.parse(data);
            	console.log('data', data.results.collection1 )

                data.results.collection1.forEach(function( item ){


			        var article = new Article({
                        //title
				        title: item.title.text,
                        //文章的url
					    url: item.title.href,
                        //作者
					    author: item.users.text,
                        //來源
                        from: 'TOP10',
                        //描述
					    describe: item.describe,
                        //一些小資訊
					    info: [
                            //收藏的人數
                            item['follow-branch'][0].text,
                            //收藏連接網址
                            item['follow-branch'][0].href,
                            //branch的數量
					    	item['follow-branch'][1].text,
                            //branch的連接網址
                            item['follow-branch'][2].href,
                            //誰的branch名稱
                            item.branch.text,
                            //誰的branch的連接網址
                            item.branch.href
					    ]
				    });

				    //儲存到資料庫
				    article.save(function(err, result) {
				        if (err)
				        	console.log('[TEST] create article FAIL, err ->', err);
				    });
                });
		});
	};
}


module.exports = crawl;
