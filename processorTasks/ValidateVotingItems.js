/**
 * Created by jean-sebastiencote on 2/23/15.
 */
(function(_, q, util, base){
    'use strict';

    function ValidateVotingItems(serviceMessage) {
        base.TaskNode.call(this, serviceMessage);
        this.name = 'ValidateVotingItems';
    }

    util.inherits(ValidateVotingItems, base.TaskNode);

    ValidateVotingItems.prototype.handleRequest = function (context) {
        var dfd = q.defer();
        var self = this;

        process.nextTick(function () {

            dfd.resolve(context);
        });


        return dfd.promise;

    };

    module.exports = ValidateVotingItems;


})(
    require('lodash'),
    require('q'),
    require('util'),
    require('jsai-jobprocessor')
);