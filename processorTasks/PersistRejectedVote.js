/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function PersistRejectedVote(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'PersistRejectedVote';
    }

    util.inherits(PersistRejectedVote, base.TaskNode);

    PersistRejectedVote.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {
            console.log("PersistRejectedVote");
            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = PersistRejectedVote;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);