let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let address = 'http://localhost:8080/api/like';

let dispatcher = function(type, data){
	AppDispatcher.handleViewAction({
		actionType: AppConstants[type],
		data: data
	});
};

let AppActions_Like = {

	like( uid, aid){
		let url = address + '/';
		fetch(url, {
			method: 'POST',
			body: { uid, aid },
		})
		.then( res => res.json())
		.then( result => dispatcher('LIKE_ADD', result))
		.catch( err => dispatcher('noop', null));
	},

	unlike( uid, aid){
		let url = address + '/';
		fetch(url, {
			method: 'DELETE',
			body: { uid, aid },
		})
		.then( res => res.json())
		.then( result => dispatcher('LIKE_DELETE', result))
		.catch( err => dispatcher('noop', null));
	},
};

module.exports = AppActions_Like;
