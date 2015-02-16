/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function(){

    'use strict';

    module.exports = function(app) {

        app.resource('api', function () {
            this.resource('voters');
            this.resource('votingDescriptorTypes', function() {
                this.resource('voters');
            });
        });

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });


    }

})();