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
var likes = [];
/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
objectAssign( Store, EventEmitter.prototype, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getArticleList: () => {
        return articles;
    },

    getLike: () => {
        return likes;
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
            break;

        /*
         *  載入like資料
         */
        case AppConstants.LIKE_LOAD:
            likes = data;
            break;

        /*
         *  載入like資料
         */
        case AppConstants.LIKE_ADD:
            likes.push(data);
            break;

        default:
    }
})

module.exports = Store;
