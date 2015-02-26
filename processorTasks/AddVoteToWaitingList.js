/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function AddVoterToWaitingList(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'AddVoterToWaitingList';
    }

    util.inherits(AddVoterToWaitingList, base.TaskNode);

    AddVoterToWaitingList.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {
            console.log("AddVoteToWaitingList");
            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = AddVoterToWaitingList;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);