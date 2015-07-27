/**
 * TodoStore
 */

//========================================================================
//
// IMPORT

let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');
let actions = require('../actions/AppActions_User.jsx');

let objectAssign = require('object-assign');
let EventEmitter = require('events').EventEmitter; // 取得一個 pub/sub 廣播器

//========================================================================
//
var Store = {};

//data
var articles = [];
var likedArticles = [];

//filter
var filter = [];

//ctrl
var isNotLoading = true;
var isMoreData = true;

objectAssign( Store, EventEmitter.prototype, {

    //data
    getArticleList() { return articles; },
    getLikedArticleList() { return likedArticles; },

    //filter
    getFilter(){ return filter; },

    //ctrl
    getIsNotLoading(){ return isNotLoading; },
    getIsMoredata() { return isMoreData },

    noop: () => {},
});

//========================================================================
//
// event handlers

Store.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

    var action = evt.action;
    var data = action.data;

    let setIsMoreData = (count) => {
        if(count < 10)
            isMoreData = false;
        else
            isMoreData = true;
    }

    switch (action.actionType) {

        /*
         * 載入文章資料
         */
        case AppConstants.ARTICLE_LOAD:

            articles = data;

            //set
            setIsMoreData(data.length);
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         * 接續載入文章資料
         */
        case AppConstants.ARTICLE_LOADMORE:

            articles = articles.concat(data);

            //set
            setIsMoreData(data.length);
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

         /*
          * 載入我喜歡的文章
          */
        case AppConstants.ARTICLE_LOADLIKE:
            likedArticles = data;
            //set
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         * 篩選文章機制
         */
        case AppConstants.ARTICLE_FILTER:

            if(filter.indexOf(data) === -1 ){
                filter.push(data);
            }else{
                filter = filter.filter( (value) => {
                    return value != data
                });
            }
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        //default:
    }
})

module.exports = Store;
