let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/users';
let followAddress = 'http://localhost:8080/api/follow';
let streamAaddress = 'http://localhost:8080/api/users/stream';

let AppActions_User = {

	login( data, loginFail ){
		$.ajax({
			url: address + '/login',
			type: 'POST',
			data: data,

			success: function(result){

				let login = false;

				if( result.login === true ){
					login = true;
				}else{
					loginFail(); //show dialog
				}

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOGIN,
					data: result
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

	forgetPwd( data ) {
		$.ajax({
			url: address + '/pwd?email=' + data.email,
			type: 'GET',

			success: function(result){

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

	changeDisplay( page ) {

		//conosle.log('page', )

		AppDispatcher.handleViewAction({
			actionType: AppConstants.CHANGE_DISPLAY,
			data: page
		});
	},

	loaduserList() {
		$.ajax({
			url: streamAaddress + '/',
			type: 'GET',

			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_LOAD,
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

	follow( uid, him) {
		$.ajax({
			url: followAddress + '/',
			type: 'POST',
			data: { uid, him },
			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_FOLLOW,
					data: him
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

	unfollow( uid, him) {
		$.ajax({
			url: followAddress + '/',
			type: 'DELETE',
			data: { uid, him },
			success: function(result){

				AppDispatcher.handleViewAction({
					actionType: AppConstants.USER_UNFOLLOW,
					data: him
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

module.exports = AppActions_User;