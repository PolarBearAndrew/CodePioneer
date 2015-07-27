let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/article';

let AppActions_Articles = {


	load(){
		$.ajax({
			url: address + '/news',
			type: 'GET',

			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.ARTICLE_LOAD,
					data: result
				});
			},
			error: function(err){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.noop,
					data: null
				});
			}
		});
	},

	loadmore( finalIndex, lastestTime ){
		$.ajax({
			url: address + '/stream?finalIndex=' + finalIndex + '&lastestTime=' + lastestTime,
			type: 'GET',

			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.ARTICLE_LOADMORE,
					data: result
				});
			},
			error: function(err){

				console.log('err', err);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.noop,
					data: null
				});
			}
		});
	},

	loadLike( likeAry ){
		$.ajax({
			url: address + '/like',
			type: 'POST',
			data: { like: likeAry},
			success: function(result){

				console.log('action', result);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.ARTICLE_LOADLIKE,
					data: result
				});
			},
			error: function(err){

				console.log('err', err);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.noop,
					data: null
				});
			}
		});
	},

	filter( from ){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.ARTICLE_FILTER,
			data: from
		});
	},
};

module.exports = AppActions_Articles;