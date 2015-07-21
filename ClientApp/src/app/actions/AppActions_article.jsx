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
					actionType: AppConstants.USER_LOGIN,
					data: null
				});
			}
		});
	},

	loadLike( uid ){
		$.ajax({
			url: address + '/news',
			type: 'GET',
			data: { uid },

			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.LIKE_LOAD,
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

	addLike( uid, aid){
		$.ajax({
			url: address + '/news',
			type: 'POST',
			data: { uid, aid},

			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.LIKE_ADD,
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

}

module.exports = AppActions_Articles;