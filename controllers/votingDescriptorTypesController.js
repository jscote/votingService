/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 10/20/13.
 */

(function (util, base, Permission, PermissionAnnotation, noAuthAnnotation, permissionEnum, httpApiResponse, q, queue) {

    'use strict';


    function VotingDescriptorTypesController(serviceMessage) {
        if (!(this instanceof VotingDescriptorTypesController)) return new VotingDescriptorTypesController(serviceMessage);

        base.call(this);

        this.messaging = serviceMessage;

    }

    util.inherits(VotingDescriptorTypesController, base);


    /*SampleController.prototype.annotations =
        [new PermissionAnnotation()
            .addRequiredPermission(new Permission(permissionEnum().CanLogin))
        ];*/

    VotingDescriptorTypesController.prototype.annotations =
        [new noAuthAnnotation()];

    VotingDescriptorTypesController.prototype.index = function (request) {
        return {"someData" : "someData"};
    };

    VotingDescriptorTypesController.prototype.index.annotations =
        [new PermissionAnnotation()
            .addRequiredPermission(new Permission(permissionEnum().CanGetCustomer))];

    VotingDescriptorTypesController.prototype.get = function (request) {
        //This demonstrate that if we want, we can return an object that has the shape of what the route handler is expecting
        //That would allow having more control on the status code when needed

        var message = new this.messaging.ServiceMessage({data: {id: request.params.example}});
        var dfd = q.defer();

        //TODO - Handle exception better
        this.customerService.getCustomer(message).then(function (result) {
            if (result.isSuccess) {
                dfd.resolve(httpApiResponse.createHttpApiResponse('201', result.data));
            } else {
                dfd.resolve(httpApiResponse.createHttpApiResponse('400', result.errors));
            }
        });

        return dfd.promise;
    };



    VotingDescriptorTypesController.prototype.create = function(request) {

        var msg = {example: 1};
        var response = queue.send('CustomerCreation', msg);

        return response;
    };
    VotingDescriptorTypesController.prototype.create.annotations = [new httpApiResponse.HttpStatusCode(202)];

    VotingDescriptorTypesController.prototype.update = function(request) {

        var msg = new this.messaging.ServiceMessage({data: {example: 1}});

        var queueResponse = queue.send('CustomerUpdate', msg);

        var response = msg.createServiceResponseFrom();
        if(!queueResponse.isSuccess) {
            queueResponse.errors.forEach(function(item) {
                response.addError(item);
            });
        }

        return response;
    };
    VotingDescriptorTypesController.prototype.update.annotations = [new httpApiResponse.HttpStatusCode(202)];

    module.exports = VotingDescriptorTypesController;

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

