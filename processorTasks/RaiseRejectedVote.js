/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function RaiseRejectedVote(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'RaiseRejectedVote';
    }

    util.inherits(RaiseRejectedVote, base.TaskNode);

    RaiseRejectedVote.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {
            console.log("RaiseRejectedVote");
            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = RaiseRejectedVote;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);