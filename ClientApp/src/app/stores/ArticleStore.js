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

//data
var Store = {};

var articles = [];
var isNotLoading = true;

var filter = [];

objectAssign( Store, EventEmitter.prototype, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getArticleList: () => {
        return articles;
    },

    getIsNotLoading(){
        return isNotLoading;
    },

    getFilter(){
        return filter;
    },

    noop: () => {

    },
});

//========================================================================
//
// event handlers

Store.dispatchToken = AppDispatcher.register( function eventHandlers(evt){

    // evt .action 就是 view 當時廣播出來的整包物件
    // 它內含 actionType
    var action = evt.action;
    var data = action.data;

    switch (action.actionType) {

        /*
         * 載入文章資料
         */
        case AppConstants.ARTICLE_LOAD:
            articles = data;
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         * 接續載入文章資料
         */
        case AppConstants.ARTICLE_LOADMORE:
            articles = articles.concat(data);
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
