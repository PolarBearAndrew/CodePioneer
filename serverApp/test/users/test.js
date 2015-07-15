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
 * [GET] 查詢使用者
 * request : _id
 * respone : name, email, pwd
 */
describe('product[@test](/user/test)', function() {

    return;
});