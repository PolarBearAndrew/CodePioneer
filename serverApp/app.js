var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




var port = 8080;

app.listen(port, function(){

    console.log('[Server] started, on -> localhost:' + port);

    // test data init
    //==========================================
    var models = require('./models/user.js');

    console.log('init test data...');

    var data = [
        { name: 'AndrewChen', email: 'chenpoanandrew@gmail.com', pwd: '123' },
        { name: 'Ray', email: 'q3856245@gmail.com', pwd: '123' },
        { name: 'Doro', email: 'rilakkuma0330k@gmail.com', pwd: '123' },
        { name: 'Husan', email: 'keami326@gmail.com', pwd: '123' }
    ];

    models.User.remove({}, function( err, result ){

        data.forEach(function( info ){
            var user = new models.User( info );

            //儲存到資料庫
            user.save(function(err, result) {
                // console.log('create test user : ' + result);
            });
        });
    });

    //==========================================
});

module.exports = app;
