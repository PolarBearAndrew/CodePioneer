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

var user = {
    id:'',
    name: '',
    email: '',
}

var isLogin = false;

var isInit = true;

/**
 * 建立 Store class，並且繼承 EventEMitter 以擁有廣播功能
 */
objectAssign( Store, EventEmitter.prototype, {

    /**
     * Public API
     * 供外界取得 store 內部資料
     */
    getUser(){
        return user;
    },

    getIsLogin(){
        return isLogin;
    },

    getIsInit(){
        return isInit;
    },

    //
    noop: function(){}
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

        /**
         *
         */
        case AppConstants.USER_LOGIN:

            isLogin = data;
            isInit = false;

            Store.emit( AppConstants.CHANGE_EVENT );

            console.log('login', isLogin);

            break;


        default:
    }
})

module.exports = Store;