let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//debug
let debug = require('debug')('app.js');

//entry
let routes = require('./routes/index');

//API
let user = require('./routes/api-user');
let like = require('./routes/api-like');
let follow = require('./routes/api-follow');
let article = require('./routes/api-article');
let articleAssignClass = require('./routes/api-article-assignClass.js');
let userStream = require('./routes/api-user-stream.js');

//feature modules
let crawl = require('./feature/crawl.js');
let testCrawlAPI = require('./feature/test-CrawlAPI.js');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set haeder
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); //讓req.body可以在JSON內傳送Array
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use('/', routes);
app.use('/api/users', user);
app.use('/api/users/stream', userStream);
app.use('/api/like', like);
app.use('/api/follow', follow);
app.use('/api/article', article);
app.use('/api/article/assign', articleAssignClass);

//test, need to remove
app.use('/api/testCrawlAPI', testCrawlAPI);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

if (app.get('env') === 'development') {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



let port = 8080;

app.listen(port, () => {

    console.log('[Server] started -> http://localhost:' + port);

    //test data
    //==========================================

    let User = require('./models/user.js');
    let Article = require('./models/article.js');

    let user = new User({
        name: '測試人員',
        email: '123',
        pwd: '123',
        like: [],
        follow: [],
        imgUrl: 'images/andrew.png'
    });

    let uid = null;

    User.removeAsync({})
        .then(() => {
            return user.saveAsync();
        })
        .spread((result) => {

            //set user id
            uid = result._id;

            return Article.find()
                          .limit(13)
                          .execAsync();
        })
        .then( (result) => {


            let likeHim = [
                { name: '雷尚樺', email: '999', pwd: '999', like: [], follow: [], imgUrl: 'images/ray.png' },
                { name: '洪于雅', email: '999', pwd: '999', like: [], follow: [], imgUrl: 'images/doro.png' },
                { name: '陳思璇', email: '999', pwd: '999', like: [], follow: [], imgUrl: 'images/hsuan.png' },
                { name: '蔡鄭欽', email: '999', pwd: '999', like: [], follow: [], },
            ];

            //set articles to arr
            let index = 0;
            for (var i = result.length - 1; i >= 0; i--) {

                //keep push data
                likeHim[index].like.push(result[i]._id);

                if( i % 4 === 0 ) {
                    likeHim[index].follow.push(uid);

                    //db operation
                    let him = new User(likeHim[index]);
                    him.saveAsync()
                       .then( (result) => {
                           debug('[POST] 新增測試使用者 success ->', result);
                       })
                       .catch( (err) => {
                           debug('[POST] 新增測試使用者 fail', index, err);
                       });

                    //next
                    index++;
                }
            };
        })
        .catch((err) => {
            debug('[POST] 新增測試使用者 fail ->', err);
        });



    //crawl
    //==========================================

     Article.find()
            .execAsync()
            .then((result) => {

                if (result.length <= 10) {
                    console.log('[crawl] 查詢爬蟲資料, 資料不足, 重新爬蟲資料');

                    //re init data¡
                    let crawltick = new crawl();
                    crawltick.start();
                } else {
                    console.log('[crawl] 查詢爬蟲資料, 已存在無需更新');
                }
            })
            .catch((err) => {
                console.log('[crawl] 查詢爬蟲資料失敗 ->', err);
            });
});

module.exports = app;
