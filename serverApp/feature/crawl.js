var request = require("request");
var Article = require('../models/article.js');
//debug
let debug = require('debug')('Feature:user');

function crawl(){


	this.start = () => {

		// setInterval(function(){
		// 	console.log('tick');
		// }, (1000) ); //5 min

		/*
		 * Hacker News
		 */
		let getHackerNews = () => {
			request("https://www.kimonolabs.com/api/2ydhrtbc?apikey=YTFXE6bo643qztfqtgMJxbTghxkihceB",
		   		(err, res, data) => {

	                data = JSON.parse(data);

	                data.results.collection1.forEach( (item)=>{

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
					     article.saveAsync()
					    		.then( (result) => {
					        		debug('[crawl] Hacker News success ->', result);
					    		})
					    		.catch( (err) => {
					    			debug('[crawl] Hacker News fail ->', err);
					    		});
	            	});
            	});
		}

		/*
		 * Github top 10
		 */
        let getGithun10 = () => {
        	request("https://www.kimonolabs.com/api/bsujce7y?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
 		    function(err, res, data) {

                 data = JSON.parse(data);
//             	 console.log('data', data.results.github_top10 );

                 data.results.github_top10.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                         //作者
 					    author: item.author.text,
                         //來源
                        from: 'Githun TOP10',
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                             //收藏的人數
                             item.follow_branch[0].text,
                             //收藏連接網址
                             item.follow_branch[0].href,
                             //branch的人數
                             item.follow_branch[1].text,
                             //branch連接網址
                             item.follow_branch[1].href,
                             //發布的日期
                             item.updated
 					    ]
 				    });

 				    //db operation
 				    article.saveAsync()
					    		.then( (result) => {
					        		debug('[crawl] Github top 10 success ->', result);
					    		})
					    		.catch( (err) => {
					    			debug('[crawl] Github top 10 fail ->', err);
					    		});
                 });
			});
		}

        /*
		 * iThome Technology
		 */
        let getIThomeTech = () => {
        	request("https://www.kimonolabs.com/api/2o2sayb4?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
 		    function(err, res, data) {

                 data = JSON.parse(data);
//                 console.log('data', data.results.ithome );

                 data.results.ithome.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                         //來源
                         from: 'iThome',
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                             //發布的日期
                             item.updated
 					    ]
 				    });

 				    //儲存到資料庫
 				    article.saveAsync()
					    		.then( (result) => {
					        		debug('[crawl] iThome Technology success ->', result);
					    		})
					    		.catch( (err) => {
					    			debug('[crawl] iThome Technology fail ->', err);
					    		});
                });
			});
        }
        
        /*
		 * iThome News
		 */
        let getIThomeNews = () => {
            request("https://www.kimonolabs.com/api/61ni6bdmapikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
 		    function(err, res, data) {

                 data = JSON.parse(data);
//                 console.log('data', data.results.ithome_news );

                 data.results.ithome_news.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                         //來源
                         from: 'iThome',
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                             //發布的日期
                             item.updated
 					    ]
 				    });

 				    //儲存到資料庫
 				    article.saveAsync()
					    		.then( (result) => {
					        		debug('[crawl] iThome News success ->', result);
					    		})
					    		.catch( (err) => {
					    			debug('[crawl] iThome News fail ->', err);
					    		});
                 });
		 });
        }


         Article.removeAsync()
				.then( ()=>{
					getHackerNews();
					getGithun10();
					getIThomeTech();
				})
				.catch( (err) => {

				})
	};
}


module.exports = crawl;
