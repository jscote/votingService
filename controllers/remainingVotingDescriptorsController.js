/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 10/20/13.
 */

(function (util, base, Permission, PermissionAnnotation, noAuthAnnotation, permissionEnum, httpApiResponse, q, queue) {

    'use strict';


    function RemainingVotingDescriptorsController(serviceMessage) {
        if (!(this instanceof RemainingVotingDescriptorsController)) return new RemainingVotingDescriptorsController(serviceMessage);

        base.call(this);

        this.messaging = serviceMessage;

    }

    util.inherits(RemainingVotingDescriptorsController, base);


    RemainingVotingDescriptorsController.prototype.annotations =
        [new noAuthAnnotation()];

    RemainingVotingDescriptorsController.prototype.get = function (request) {
        //This should return a list of voters that have not yet voted for the voting descriptor

        var message = new this.messaging.ServiceMessage({data: {id: request.params}});
        var dfd = q.defer();

        dfd.resolve({someData: 'Have not voted yet'});

        return dfd.promise;
    };


    module.exports = RemainingVotingDescriptorsController;

})(require('util'),
    require(Injector.getBasePath() + '/controllers/permissionApiController'),
    require(Injector.getBasePath() + '/security/permissions'),
    require(Injector.getBasePath() + '/security/permissionAnnotation'),
    require(Injector.getBasePath() + '/security/noAuthRequiredAnnotation'),
    require(Injector.getBasePath() + '/security/permissionEnum'),
    require(Injector.getBasePath() + '/helpers/httpApiResponse'),
    require('q'),
    require('jsai-queuing')
);

