/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function (express, passport) {

    'use strict';

    module.exports = function getWebServerInstance(params) {

        params = params || {};
        // specify current dir as default root of server
        params.root = params.root || __dirname;

        var app = express();
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var session = require('express-session');

// view engine setup
        app.set('views', path.join(params.root, 'views'));
        app.set('view engine', 'ejs');

        //API express-resource-new setup
        app.set('controllers', path.join(params.root, 'routes'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(params.root, 'public')));
        app.use(session({secret: 'too many secrets', resave: false, saveUninitialized: true}));
        app.use(passport.initialize());
        app.use(passport.session());


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

        return app;
    }

})(require('express'), require('passport'), require('express-resource-new'));