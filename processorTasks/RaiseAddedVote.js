/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function RaiseAddedVote(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'RaiseAddedVote';
    }

    util.inherits(RaiseAddedVote, base.TaskNode);

    RaiseAddedVote.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {
            console.log("RaiseAddedVote");
            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = RaiseAddedVote;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);