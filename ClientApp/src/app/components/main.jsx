
//react 初始化
let React = require('react');

//app
let Login = require('./login/login.jsx');
let Container = require('./container.jsx');

//flux - store
let MainStore = require('../stores/MainStore.js');
let ArticleStore = require('../stores/ArticleStore.js');

//flux - contant
let AppConstants = require('../constants/AppConstants.js');

//actions
let actionsLike = require('../actions/AppActions_like.jsx');
let actionsArticle = require('../actions/AppActions_article.jsx');


//main是這個元件暫時使用的名字
let Main = React.createClass({

	getInitialState(){
		return this.getTruth();
    },

	componentWillMount() {
        MainStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
		ArticleStore.addListener( AppConstants.CHANGE_EVENT, this._onChange );
	},

	shouldComponentUpdate() {
		return true;
	},

	render() {

        let displayPage = {
        	Login: false,
        	Container: false,
        };

        displayPage[this.state.displayPage] = true;

	    return (
	    	<div id='wrapper' >
	    		{ displayPage.Login ? <Login /> : null }
	    		{ displayPage.Container ? <Container articles={ this.state.articles } user={ this.state.user } loadmore={ actionsArticle.loadmore }/> : null }
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