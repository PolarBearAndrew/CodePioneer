
//react 初始化
let React = require('react');

//app
let LoginApp = require('./loginApp.jsx');
let Container = require('./container.jsx');

//flux data store
let MainStore = require('../stores/MainStore.js');
let AppConstants = require('../constants/AppConstants.js');

//main是這個元件暫時使用的名字
let Main = React.createClass({

	getInitialState(){
		return this.getTruth();
    },

	componentWillMount() {
		MainStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
	},

	shouldComponentUpdate() {
		return true;
	},

	render() {
        //<Container />
        //<LoginApp />

        let displayPageCSS = {
        	LoginApp: false,
        	Container: false,
        };

        displayPageCSS[this.state.displayPage] = true;

        console.log('displayPageCSS', displayPageCSS);

	    return (
	    	<div id='wrapper' >
	    		{ displayPageCSS.LoginApp ? <LoginApp /> : null }
	    		{ displayPageCSS.Container ? <Container /> : null }
	    	</div>
	    );
	},

	_onChange() {
        this.setState( this.getTruth() );
    },

    getTruth() {

        return {
        	displayPage: MainStore.getDisplayPage(),
        };
    }

});

module.exports = Main;