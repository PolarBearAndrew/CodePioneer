var request = require('request');

describe('product[@test](/user/test)', function() {

    //test start
    return it('[GET] 查詢使用者', function(done) {

        //before(function(){});

        request({
            url: 'http://localhost:8080/api/users/',
            method: 'GET'
        }, function(err, res, data){

            //test api exist
            res.statusCode.should.equal(200);

            //test data
            data = JSON.parse(data);
            data.err.should.equal('資料不完全');
            return done();
        });
    });
});

// describe('product[@ym](/user/ym)', function() {
//     var str;
//     str = 'hello ';
//     before(function() {
//         return str += 'world';
//     });
//     return it('should test my mocha with projects', function(done) {
//         str.should.equal('hello world');
//         return done();
//     });
// });

// ---
// generated by coffee-script 1.9.2
