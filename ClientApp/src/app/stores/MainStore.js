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
var user = {
    id:'',
    name: '',
    email: '',
    like: [],
    follow: [],
    imgUrl: '',
};

var userList = null;

var isLogin = false;

var displayPage = 'Login';
var displayContainer = 'ArticleList';

/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
objectAssign( Store, EventEmitter.prototype, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getUser: () => {
        return user;
    },

    getUserList: () => { return userList; },

    getIsLogin: () => {
        return login;
    },

    getDisplayPage: () => {
        return displayPage;
    },

    getDisplayContainer: () => {
        return displayContainer;
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
         * 登入檢查
         */
        case AppConstants.USER_LOGIN:
            isLogin = data.login;
            user.id = data._id;
            user.imgUrl = data.imgUrl;

            user.like = data.like || [] ;

            if(isLogin)
                displayPage = 'Container';

            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         *  like
         */
        case AppConstants.LIKE_ADD:
            user.like.push(data);
            break;

        /*
         *  unlike
         */
        case AppConstants.LIKE_DELETE:
            user.like = user.like.filter( (value) => {
                return value != data
            });
            // Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         *  改變顯示頁面
         */
        case AppConstants.CHANGE_DISPLAY:
            displayContainer = data;
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         *  取得使用者清單
         */
        case AppConstants.USER_LOAD:
            userList = data;
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         *  新增追蹤
         */
        case AppConstants.USER_FOLLOW:
            user.follow.push(data);
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         *  取消追蹤
         */
        case AppConstants.USER_UNFOLLOW:
            user.follow = user.follow.filter( (value) => {
                return value != data
            });
            Store.emit( AppConstants.CHANGE_EVENT );
            break;

        /*
         *  nothing
         */
        case AppConstants.noop:
            console.log('[MainStore] noop');
            break;

        default:
    }
})

module.exports = Store;
