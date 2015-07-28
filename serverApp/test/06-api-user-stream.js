var request = require('request');

//debug
var debug = require('debug')('TEST:user');

var User = require('../models/user.js');

describe('[ API unit test - user-stream ]', () => {
    
    before( () => {
        
    });
    
    describe('正常操作測試', () => {
        it('[GET] 查詢使用者(10)', ( done ) => {
            
        });
        
        it('[GET] 接續查詢使用者(10)', ( done ) => {
            
        });
        
        it('[GET] 查詢喜愛使用者(10)', ( done ) => {
            
        });
        
        it('[GET] 接續查詢喜愛使用者(10)', ( done ) => {
            
        });
        
        it('[GET] 查詢追蹤使用者(10)', ( done ) => {
            
        });
        
        it('[GET] 接續查詢追蹤使用者(10)', ( done ) => {
            
        });
    });
    
    after( (done) => {
        return User.findOneAndRemove({ author: 'AndrewChen'})
                      .removeAsync()
                      .then( (result) => {
                          return done();
                      });
    });
});