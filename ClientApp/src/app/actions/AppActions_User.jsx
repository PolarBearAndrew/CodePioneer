let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/users';

let AppActions_User = {

	login( data, loginFail ){
		$.ajax({
			url: address + '/login',
			type: 'POST',
			data: data,

			success: function(result){

				let login = false;

				if( result.login === true )
					login = true;
				else
					loginFail(); //show dialog

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN,
					data: login
				});
			},
			error: function(err){

				loginFail(); //show dialog

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN,
					data: false
				});
			}

		});
	},

	signUp( data, loginSuccess ){
		$.ajax({
			url: address + '/',
			type: 'POST',
			data: data,

			success: function(result){

				loginSuccess();

				console.log('result', result);

				AppDispatcher.handleViewAction({
					actionType: AppConstants.noop,
					data: null
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

module.exports = AppActions_User;