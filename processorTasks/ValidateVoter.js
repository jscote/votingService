/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function ValidateVoter(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'ValidateVoter';
    }

    util.inherits(ValidateVoter, base.TaskNode);

    ValidateVoter.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {

            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = ValidateVoter;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);