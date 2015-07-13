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

	login( data, showDialog ){
		$.ajax({
			url: address + '/login',
			type: 'POST',
			data: data,

			success: function(result){

				let login = false;

				if( result.login === true )
					login = true;
				else
					showDialog();

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN,
					data: login
				});
			},
			error: function(err){

				showDialog();

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN,
					data: false
				});
			}

		});
	}

}

module.exports = AppActions_User;