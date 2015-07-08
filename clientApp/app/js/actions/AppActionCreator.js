/**
 *
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Promise = require('es6-promise').Promise;

var IPaddress = 'localhost:3333';
//var IPaddress = '120.96.75.142:8080';  //at home

var AppActionCreators = {

    /**
     * app init, init load
     */
    load: function(){

        // $.ajax('http://' + IPaddress + '/api/log/',
        // {
        //     type:"GET",

        //     success: function(data, status, jqxhr){

        //         AppDispatcher.handleViewAction({

        //             actionType: AppConstants.TODO_LOAD,
        //             items: data
        //         });

        //     },

        //     error: function( err, status, errText ){
        //         console.error( 'ERROR', err.responseText );
        //     }

        // })

    },

    noop: function(){}
};

module.exports = AppActionCreators;
