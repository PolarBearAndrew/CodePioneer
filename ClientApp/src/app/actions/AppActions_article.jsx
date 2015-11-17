let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/article';

let dispatcher = function(type, data){
	AppDispatcher.handleViewAction({
		actionType: AppConstants[type],
		data: data
	});
};

let AppActions_Articles = {
	load(){
		let url = address + '/news';
		fetch(url)
		.then( res => res.json())
		.then( result => dispatcher('ARTICLE_LOAD', result))
		.catch( err => dispatcher( 'noop', null));
	},

	loadmore( finalIndex, lastestTime ){
		let url = address + '/stream?finalIndex=' + finalIndex + '&lastestTime=' + lastestTime;
		fetch(url)
		.then( res => res.json())
		.then( result => dispatcher('ARTICLE_LOADMORE', result))
		.catch( err => dispatcher('noop', null));
	},

	loadLike( likeAry ){
		let url = address + '/like';
		fetch(url, {
			query: { like: likeAry}
		})
		.then( res => res.json())
		.then( result => dispatcher('ARTICLE_LOADLIKE', result))
		.catch( err => dispatcher('noop', null));
	},

	loadhelike( uid ){
		let url = 'http://localhost:8080/api/like/';
		fetch(url, {
			query: { uid },
		})
		.then( res => res.json())
		.then( result => dispatcher('HELIKE_LOAD', result))
		.catch( err => dispatcher('noop', null));
	},

	loadTheyLiked( uid ){
		let url = address + '/follow/like';
		fetch(url, {
			query: { uid },
		})
		.then( res => res.josn())
		.then( result => dispatcher('ARTICLE_LOADTHEYLIKE', result))
		.catch( err => dispatcher('noop', null));
	},

	filter( from ){
		return dispatcher('ARTICLE_FILTER', from);
	},
};

module.exports = AppActions_Articles;
