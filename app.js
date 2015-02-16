var express = require('express');


var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var client = redis.createClient(6379,'192.168.137.202');
var async=require("async");
var SessionStore = require('express-mysql-session');



var options = {
    host: 'minfo2014.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'minfo',
    password: '6yhn7ujm',
    database: 'minfo'
};

var sessionStore = new SessionStore(options);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



app.set(function(){ app.use(yourheader)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{
    maxAge:'1d',
    setHeaders: function (res, path) {
        res.set('X-Powered-By', 'Hello');
        res.set('x-timestamp', Date.now());
    }
}));


app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    cookie: {maxAge: 1000 * 60},
    resave: true,
    saveUninitialized: true
}));

/*
app.use(session({
    store: new RedisStore({
        host: "192.168.137.202",
        port: 6379
    }),
    resave:false,
    saveUninitialized:false,
    secret: 'linly'
}));
*/

app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'ABC');
    res.setHeader('Cache-contral','max-age=315360000');
    //console.log('Time: %d', Date.now());
    next();
});

app.use('/', routes);
app.use('/users', users);

/*
app.get('/redisses',function(req,res){
    req.session.user = 'linly';
    console.log(req.session);
    res.cookie('name', 'tobi', { domain: '', path: '/admin', secure: true });
    res.send(req.session.user);
});


app.get('/checkses',function(req,res){
    //console.log(req.session.user);
    console.log(req.cookies)
    res.send(req.session.user+':sesss');
});

app.get('/showredis',function(req,res){
    client.send_command("keys",['*'],function (err, reply) {

        async.mapSeries(reply,function(item,cb){
           console.log(item);
           client.get(item,function(err,xreplay){
               var a={};
               a[item]=JSON.parse(xreplay);
               cb(null,a);
           });
        },function(err,xres){
            console.log(xres);
            res.render('redis_info',{restxt:xres});
        });
    });
});
*/

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


module.exports = app;
