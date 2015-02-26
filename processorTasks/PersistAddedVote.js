/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function PersistAddedVote(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'PersistAddedVote';
    }

    util.inherits(PersistAddedVote, base.TaskNode);

    PersistAddedVote.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {
            console.log("PersistAddedVote");
            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = PersistAddedVote;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);