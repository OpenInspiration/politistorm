var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var twitter = require('twitter');
var util = require('util');

var routes = require('./routes/index');
var users = require('./routes/users');

const project_directory = path.dirname(path.dirname(require.main.filename)); // Two directories above ./bin/www


var app = express();


const appConfigPath = path.join(project_directory, '.env.json');
var appConfigContent = fs.readFileSync(appConfigPath, 'utf8');
var appConfig = JSON.parse(appConfigContent);
var tweeter = new twitter(appConfig);
app.set('tweeter', tweeter);


// Database setup
var db;
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.TRUMPIO_MONGO_DB_URL, (err, database) => {
    if (err) {
        throw new Error('Database failed to connect: ' + process.env.TRUMPIO_MONGO_DB_URL);
    } else {
        db = database;
    }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(errorHandler());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;