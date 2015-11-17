let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/users';
let followAddress = 'http://localhost:8080/api/follow';
let streamAaddress = 'http://localhost:8080/api/users/stream';

let dispatcher = function(type, data){
	AppDispatcher.handleViewAction({
		actionType: AppConstants[type],
		data: data
	});
};

let AppActions_User = {

	login( data, loginFail ){
		let url = address + '/login';
		fetch(url, {
			method: 'POST',
			body: data
		})
		.then( res => res.json())
		.then( result => dispatcher('USER_LOGIN', result))
		.catch( err => dispatcher('USER_LOGIN', false));
	},

	signUp( data, loginSuccess ){
		let url = address + '/';
		fetch(url, {
			metod: 'POST'
		})
		.then( res => res.json())
		.then( result => {
			loginSuccess();
			return dispatcher('noop', null);
		})
		.catch( err => dispatcher('noop', null));
	},

	forgetPwd( data ) {
		let url = address + '/pwd?email=' + data.email;
		fetch(url)
		.then( res => res.json())
		.then( result => dispatcher('noop', null))
		.catch( err => dispatcher('noop', null));
	},

	changeDisplay( page ) {
		dispatcher('CHANGE_DISPLAY', page);
	},

	loaduserList() {
		let url = streamAaddress + '/';
		fetch(url)
		.then( res => res.json())
		.then( result => dispatcher('USER_LOAD', result))
		.catch( err => dispatcher('noop', null));
	},

	follow( uid, him) {
		let url = followAddress + '/';
		fetch(url)
		.then( res => res.json())
		.then( result => dispatcher('USER_FOLLOW', result))
		.catch( err => dispatcher('noop', null));
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
