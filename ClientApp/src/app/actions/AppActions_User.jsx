let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/users';

let AppActions_User = {




	load(){
		// console.log('load data');

		// AppDispatcher.handleViewAction({
		// 	actionType: AppConstants.USER_LOGIN
		// });
	},

	login(){
		$.ajax({
			url: address + 'login',
			type: 'POST',
			success: function(result){
				// alert(result);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN
				});
			},
			error: function(err){
				//alert(err);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN
				});
			}

		});
	}

}

module.exports = AppActions_User;