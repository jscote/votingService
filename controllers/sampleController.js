/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 10/20/13.
 */

(function (util, base, Permission, PermissionAnnotation, permissionEnum, httpApiResponse, q) {

    'use strict';


    function SampleController(serviceMessage) {
        if (!(this instanceof SampleController)) return new SampleController(serviceMessage);

        base.call(this);

        this.messaging = serviceMessage;

    }

    util.inherits(SampleController, base);


    SampleController.prototype.annotations =
        [new PermissionAnnotation()
            .addRequiredPermission(new Permission(permissionEnum().CanLogin))
        ];

    SampleController.prototype.index = function (request) {

        var dfd = q.defer();
        this.customerService.getCustomers().then(function (result) {
            dfd.resolve(httpApiResponse.createHttpApiResponse('200', result.data));
        });

        return dfd.promise;
    };

    SampleController.prototype.index.annotations =
        [new PermissionAnnotation()
            .addRequiredPermission(new Permission(permissionEnum().CanGetCustomer))];

    SampleController.prototype.get = function (request) {
        //This demonstrate that if we want, we can return an object that has the shape of what the route handler is expecting
        //That would allow having more control on the status code when needed

        var message = new this.messaging.ServiceMessage({data: {customerId: request.params.customer}});
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


    module.exports = SampleController;

})(require('util'),
    require(Injector.getBasePath() + '/controllers/permissionApiController'),
    require(Injector.getBasePath() + '/security/permissions'),
    require(Injector.getBasePath() + '/security/permissionAnnotation'),
    require(Injector.getBasePath() + '/security/permissionEnum'),
    require(Injector.getBasePath() + '/helpers/httpApiResponse'),
    require('q')
);

