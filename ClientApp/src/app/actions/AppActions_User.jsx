let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let AppActions_User = {

	load(){
		console.log('load data');

		AppDispatcher.handleViewAction({
			actionType: AppConstants.USER_LOGIN
		});

	}

}

module.exports = AppActions_User;