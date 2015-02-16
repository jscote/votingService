/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 10/20/13.
 */

(function (util, base, Permission, PermissionAnnotation, noAuthAnnotation, permissionEnum, httpApiResponse, q, queue) {

    'use strict';


    function RemainingVotersController(serviceMessage) {
        if (!(this instanceof RemainingVotersController)) return new RemainingVotersController(serviceMessage);

        base.call(this);

        this.messaging = serviceMessage;

    }

    util.inherits(RemainingVotersController, base);


    RemainingVotersController.prototype.annotations =
        [new noAuthAnnotation()];

    RemainingVotersController.prototype.get = function (request) {
        //Should return all descriptors that a voter has not voted for yet - Careful with the number of records that might be returned.

        var message = new this.messaging.ServiceMessage({data: {id: request.params.example}});
        var dfd = q.defer();

        dfd.resolve({someData: "this is all the remaining item a voter can vote for"});

        return dfd.promise;
    };



    RemainingVotersController.prototype.create = function(request) {

    };
    RemainingVotersController.prototype.create.annotations = [new httpApiResponse.HttpStatusCode(202)];

    RemainingVotersController.prototype.update = function(request) {

    };
    RemainingVotersController.prototype.update.annotations = [new httpApiResponse.HttpStatusCode(202)];

    module.exports = RemainingVotersController;

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

