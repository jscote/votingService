/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 10/20/13.
 */

(function (util, base, Permission, PermissionAnnotation, noAuthAnnotation, permissionEnum, httpApiResponse, q, queue) {

    'use strict';


    function VotingDescriptorsController(serviceMessage) {
        if (!(this instanceof VotingDescriptorsController)) return new VotingDescriptorsController(serviceMessage);

        base.call(this);

        this.messaging = serviceMessage;

    }

    util.inherits(VotingDescriptorsController, base);

    VotingDescriptorsController.prototype.annotations =
        [new noAuthAnnotation()];


    VotingDescriptorsController.prototype.get = function (request) {

        //Should return all voters for a specific descriptor

        var message = new this.messaging.ServiceMessage({data: {id: request.params}});
        var dfd = q.defer();

        dfd.resolve({someData: 'Have voted, with breakdown!'});

        return dfd.promise;
    };


    module.exports = VotingDescriptorsController;

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

