
//react
let React = require('react');

//components
let Login = require('./login/login.jsx');
let Container = require('./container.jsx');

//flux - store
let MainStore = require('../stores/MainStore.js');
let ArticleStore = require('../stores/ArticleStore.js');

//flux - contant
let AppConstants = require('../constants/AppConstants.js');

//flux - actions
let actionsLike = require('../actions/AppActions_like.jsx');
let actionsUser = require('../actions/AppActions_User.jsx');
let actionsArticle = require('../actions/AppActions_article.jsx');

//debug
let debug = require('debug')('app:main');


//main是這個元件暫時使用的名字
let Main = React.createClass({

	getInitialState(){

        localStorage.debug = '*';

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

        debug('[state]', this.state);

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

        switch (this.state.displayContainer) {

            case 'ArticleList':
                list.data = this.state.articles;
                list.filter = this.state.filterData;
                list.isMoreData = this.state.isMoreData;
                list.loadmore = actionsArticle.loadmore;
                break;

            case 'Library':
                let likeAry = this.state.user.like;
                let likedArticles = this.state.likedArticles;

                //先刪除多餘的
                likedArticles = likedArticles.filter( ( value ) => {
                    return likeAry.indexOf( value._id ) != -1;
                });

                //有少的話就重新載入
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

                //丟入資料
                list.data = likedArticles;
                list.filter = this.state.filterData;
                list.isMoreData = false;
                list.loadmore = null;
                break;

            case 'Follow':
                list = false;
                if( this.state.userList === null )
                    actionsUser.loaduserList();
                break;

            case 'Pioneer':
                //這有個小瑕疵 資料只會load一次
                if(this.state.theyLiked.length == 0){
                    //重新載入
                    actionsArticle.loadTheyLiked(this.state.user.id);
                    break;
                }
                list.data = this.state.theyLiked;
                list.filter = this.state.filterData;
                list.isMoreData = false;
                list.loadmore = null;
                break;
        }



	    return (
	    	<div id='wrapper' >
	    		{ displayPage.Login ? <Login /> : null }
	    		{ displayPage.Container ? <Container user={ this.state.user }
                                                     userList={ this.state.userList }
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
            userList: MainStore.getUserList(),
            displayPage: MainStore.getDisplayPage(),
        	displayContainer: MainStore.getDisplayContainer(),

        	//article store
            articles: ArticleStore.getArticleList(),
            likedArticles: ArticleStore.getLikedArticleList(),
            theyLiked: ArticleStore.getTheyLiked(),

            //article ctrl
            filterData: ArticleStore.getFilter(),
        	isMoreData: ArticleStore.getIsMoredata(),
        };
    }

});

module.exports = Main;