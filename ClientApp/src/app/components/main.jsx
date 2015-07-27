
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

        let list = {
            data: null,         //data
            isMoreData: null,   //ctrl
            filter: null,       //filter ctrl
            loadmore: null,     //func
        };

        // console.log('this.state.displayContainer', this.state.displayContainer);
        console.log('library', this.state.likedArticles);
        console.log('like', this.state.user.like);

        switch (this.state.displayContainer) {

            /*
             * article list
             */
            case 'ArticleList':
                list.data = this.state.articles;
                list.filter = this.state.filterData;
                list.isMoreData = this.state.isMoreData;
                list.loadmore = actionsArticle.loadmore;
                break;

            case 'Library':

                let likeAry = this.state.user.like;
                let likedArticles = this.state.likedArticles;

                for (var i = likeAry.length - 1; i >= 0; i--) {

                    let ctrl = false;

                    for (var listIndex = likedArticles.length - 1; listIndex >= 0; listIndex--) {

                        if( likedArticles[listIndex]._id == likeAry[i] ){
                            ctrl = true;
                            break;
                        }
                    };

                    if( ctrl === false ){
                        console.log('load');
                        actionsArticle.loadLike(likeAry.join(','));
                        break;
                    }
                };

                list.data = likedArticles;
                list.filter = this.state.filterData;
                list.isMoreData = false;
                list.loadmore = null;
                break;
        }



	    return (
	    	<div id='wrapper' >
	    		{ displayPage.Login ? <Login /> : null }
	    		{ displayPage.Container ? <Container user={ this.state.user }
                                                     list={ list }
                                                     filterData={ this.state.filterData } /> : null }
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
        	displayContainer: MainStore.getDisplayContainer(),

        	//article store
            articles: ArticleStore.getArticleList(),
            likedArticles: ArticleStore.getLikedArticleList(),

            //article ctrl
            filterData: ArticleStore.getFilter(),
        	isMoreData: ArticleStore.getIsMoredata(),
        };
    }

});

module.exports = Main;