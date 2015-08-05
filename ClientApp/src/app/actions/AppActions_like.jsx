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
};

module.exports = AppActions_Like;