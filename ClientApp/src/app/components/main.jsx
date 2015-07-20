
//react 初始化
let React = require('react');

//app
let LoginApp = require('./loginApp.jsx');
let Container = require('./container.jsx');

//flux data store
let MainStore = require('../stores/MainStore.js');
let ArticleStore = require('../stores/ArticleStore.js');
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

        let displayPage = {
        	LoginApp: false,
        	Container: false,
        };

        displayPage[this.state.displayPage] = true;

        // console.log('displayPage', displayPage);

	    return (
	    	<div id='wrapper' >
	    		{ displayPage.LoginApp ? <LoginApp /> : null }
	    		{ displayPage.Container ? <Container articles={ this.state.articles }/> : null }
	    	</div>
	    );
	},

	_onChange() {
        this.setState( this.getTruth() );
    },

    getTruth() {

        return {
        	displayPage: MainStore.getDisplayPage(),
        	articles: ArticleStore.getArticleList(),
        };
    }

});

module.exports = Main;