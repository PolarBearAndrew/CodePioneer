
//react 初始化
let React = require('react');

//app
let LoginApp = require('./loginApp.jsx');
let Container = require('./container.jsx');

//flux 資料相關
// let Actions = require('../actions/AppActions_User.jsx');
// let AppConstants = require('../constants/AppConstants.js');
// let UserStore = require('../stores/UserStore');



//main是這個元件暫時使用的名字
let Main = React.createClass({

	//顯示畫面的func
	render() {

<<<<<<< HEAD
// <LoginApp />
=======
// <Container /><LoginApp />
>>>>>>> 293f410c4dd31743d2a07c17feef7868b7a1f07f
	    return (
	    	  <Container />

	    );
	},

});

module.exports = Main;