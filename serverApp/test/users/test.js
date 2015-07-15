var request = require('request');


//init data
var _id = '55a5d468f0254621357dba8b';
var initData = { name: 'AndrewChen', email: 'chenpoanandrew@gmail.com', pwd: '123' };

var User = require('../../models/user.js');

before( () => {

    User.remove({},( err, result ) => {

        var user = new User( initData );

        //儲存到資料庫
        user.save( (err, result) =>{
                _id = result._id;
                console.log('init finish');
            }
        );
    });
});

//==================================

/*
 * [GET] 查詢使用者
 * request : _id
 * respone : name, email, pwd
 */
describe('product[@test](/user/test)', () => {

    //test start
    return it('[GET] 查詢使用者', function(done) {

        console.log('_id', _id)

        //INIT
        // before( () => { });

        //TEST
        request({
            url: 'http://localhost:8080/api/users/',
            method: 'GET',
            form: { _id: _id }

        }, (err, res, data) => {


            //test api exist
            res.statusCode.should.equal(200);

            //test data
            data = JSON.parse( data );

            data.should.equal({
                _id: _id,
                name: initData.name,
                email: initData.email
            });

            //done
            return done();
        });
    });
});

/*
 * [POST] 新增使用者
 * request : name, email, pwd
 * respone : db result
 */
describe('product[@test](/user/test)', () => {

    return;
});

/*
 * [PUT] 修改使用者
 * request : _id, name, email ,pwd
 * respone : db result
 */
describe('product[@test](/user/test)', () => {

    return;
});

/*
 * [DELETE] 刪除使用者
 * request : _id
 * respone : db result
 */
describe('product[@test](/user/test)', () => {

    return;
});

/*
 * [POST] 登入檢查
 * request : email, pwd
 * respone : { login : true || false, _id : _id  }
 */
describe('product[@test](/user/test)', () => {

    return;
});

/*
 * [GET] 取回密碼
 * request : email
 * respone : { sendMail : true || false }
 */
describe('product[@test](/user/test)', () => {

    return;
});
