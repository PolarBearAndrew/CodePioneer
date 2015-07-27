var request = require("request");

//models
var Article = require('../models/article.js');

//debug
let debug = require('debug')('Feature:crawl');


//config
let config = require('../config.js');


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

	                debug('[crawl] Hacker News get data ->', data.results.collection1);

	                data.results.collection1.forEach( (item)=>{

				        var article = new Article({
	                        //title
					        title: item.title.text,
	                        //文章的url
						    url: item.title.href,
	                        //作者
						    author: item.users.text,
	                        //來源
	                        from: config.crawlName.hackerNews,
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

                 debug('[crawl] Github top 10 get data ->', data.results.github_top10);

                 data.results.github_top10.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                         //作者
 					    author: item.author,
                         //來源
                        from: config.crawlName.github10,
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                             //發布的日期
                             item.updated,
                             //收藏的人數
                             item.follow_branch[0].text,
                             //收藏連接網址
                             item.follow_branch[0].href,
                             //branch的人數
                             item.branch.text,
                             //branch連接網址
                             item.branch.href
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
        	request("https://www.kimonolabs.com/api/d73vr5sq?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
 		    function(err, res, data) {

                 data = JSON.parse(data);

				debug('[crawl] iThome Technology get data ->', data.results.ithome);

                 data.results.ithome_tech.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                        //作者
 					    author: null,
                         //來源
                        from: config.crawlName.iThomeTech,
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                             //發布的日期
                             item.updated
 					    ]
 				    });

 				    //db operation
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
         * updated 1 hours
		 */
        let getIThomeNews = () => {
            request("https://www.kimonolabs.com/api/c9njd4bo?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
 		    function(err, res, data) {

                data = JSON.parse(data);

                debug('[crawl] iThome News get data ->', data.results.ithome_news);

                data.results.ithome_news.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                        //作者
 					    author: null,
                         //來源
                        from: config.crawlName.iThomeNews,
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                             //發布的日期
                             item.updated
 					    ]
 				    });

 				    //db operation
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
        
        /*
		 * Github Tranding
		 */
        let getGitTrand = () => {
        	request("https://www.kimonolabs.com/api/2uale15w?apikey=7yjRQtS3sJ9oRobTONiJDzT1rm4Qgknt",
 		    function(err, res, data) {

                 data = JSON.parse(data);

                 debug('[crawl] Github Tranding get data ->', data.results.Github_Tranding);

                 data.results.Github_Tranding.forEach(function( item ){

 			        var article = new Article({
                         //title
 				        title: item.title.text,
                         //文章的url
 					    url: item.title.href,
                         //作者
 					    author: null,
                         //來源
                        from: config.crawlName.githubTranding,
                         //描述
 					    describe: item.describe,
                         //一些小資訊
 					    info: [
                            //更新以及建置人
                            item.describe2.Text,
                            //更新以及建置人連接網址
                            item.describe2.href,
                            //星星
                            item.star.text,
                            //星星連結
                            item.star.href,
 					    ]
 				    });

 				    //db operation
 				     article.saveAsync()
				    		.then( (result) => {
				        		debug('[crawl] Github Tranding success ->', result);
				    		})
				    		.catch( (err) => {
				    			debug('[crawl] Github Tranding fail ->', err);
				    		});
                 });
			});
		}

         Article.removeAsync()
				.then( ()=>{

					getHackerNews();

					getGithun10();

					getIThomeTech();

				    getIThomeNews();
             
                    getGitTrand();
				})
				.catch( (err) => {

				})
	};
}


module.exports = crawl;
