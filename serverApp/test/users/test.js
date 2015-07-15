var request = require('request');



/*
 * [GET] 查詢使用者
 * request : _id
 * respone : name, email, pwd
 */
describe('product[@test](/user/test)', function() {

    //test start
    return it('[GET] 查詢使用者', function(done) {

        //before(function(){});

        request({
            url: 'http://localhost:8080/api/users/',
            method: 'GET',
            form: { _id: null }

        }, function(err, res, data){

            //test api exist
            // res.statusCode.should.equal(200);

            //test data
            data = JSON.parse(data);
            data.err.should.equal('資料不完全');
            return done();
        });
    });
});

/*
 * [POST] 新增使用者
 * request : name, email, pwd
 * respone : db result
 */
describe('product[@test](/user/test)', function() {

    return;
});

/*
 * [PUT] 修改使用者
 * request : _id, name, email ,pwd
 * respone : db result
 */
describe('product[@test](/user/test)', function() {

    return;
});

/*
 * [DELETE] 刪除使用者
 * request : _id
 * respone : db result
 */
describe('product[@test](/user/test)', function() {

    return;
});

/*
 * [POST] 登入檢查
 * request : email, pwd
 * respone : { login : true || false, _id : _id  }
 */
describe('product[@test](/user/test)', function() {

    return;
});

/*
 * [GET] 取回密碼
 * request : email
 * respone : { sendMail : true || false }
 */
describe('product[@test](/user/test)', function() {

    return;
});