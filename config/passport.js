/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 2/2/14.
 */

(function (express, passport, LocalStrategy) {

    'use strict';


    module.exports = function () {
        passport.use
        (new LocalStrategy(
            function (username, password, done) {

                return done(null, {id: 1, username: username});

             }
        ));

        passport.serializeUser(function (user, done) {
            if (user) {
                done(null, user.id);
            }
        });

        passport.deserializeUser(function (id, done) {
            return done(null, {id: id});
        })

    };

})(
    require('express'),
    require('passport'),
    require('passport-local').Strategy
);