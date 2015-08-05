let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/like';

let AppActions_Like = {

	like( uid, aid){

		$.ajax({
			url: address + '/',
			type: 'POST',
			data: { uid, aid },

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

	unlike( uid, aid){

		$.ajax({
			url: address + '/',
			type: 'DELETE',
			data: { uid, aid },

			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.LIKE_DELETE,
					data: aid
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

	loadlike( uid ){
		console.log('load like', uid);

		$.ajax({
			url: address + '/',
			type: 'GET',
			data: { uid },

			success: function(result){

//				console.log('success(result)', result);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.LIKE_LOAD,
					data: result
				});
			},
			error: function(err){

				console.log('err(result)', err);
				// AppDispatcher.handleViewAction({
				// 	actionType: AppConstants.noop,
				// 	data: null
				// });
			}
		});
	}

};

module.exports = AppActions_Like;