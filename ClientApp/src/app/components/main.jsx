
//react 初始化
let React = require('react');

//app
let LoginApp = require('./loginApp.jsx');
let Container = require('./container.jsx');

//flux data store
let MainStore = require('../stores/MainStore.js');
let ArticleStore = require('../stores/ArticleStore.js');
let AppConstants = require('../constants/AppConstants.js');

//actions
let actionsLike = require('../actions/AppActions_like.jsx');


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

	    return (
	    	<div id='wrapper' >
	    		{ displayPage.LoginApp ? <LoginApp /> : null }
	    		{ displayPage.Container ? <Container articles={ this.state.articles } user={ this.state.user }/> : null }
	    	</div>
	    );
	},

	_onChange() {
        this.setState( this.getTruth() );
    },

    getTruth() {

        return {
        	//main store
        	user: MainStore.getUser(),
        	displayPage: MainStore.getDisplayPage(),

        	//article store
        	articles: ArticleStore.getArticleList(),
        };
    }

});

module.exports = Main;