/**
 * Created by jscote on 10/20/13.
 */

(function (controllerResolver, baseRoute) {

    'use strict';

    module.exports = (function sampleRouteHandler() {
        var targetController = 'sampleController';
        var controller = null;

        var all = function (request, response, next) {
            controller = controllerResolver.getController({targetController: targetController, parameters: request});
            next();
        };

        var index = function (request, response) {
            if(controller.index) {
                controller.index(request).then(function (result) {
                    response.status(result.statusCode).send(result.data);
                })
            } else {
                response.send('405');
            }
        };

        var get = function (request, response) {
            controller.get(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        var create = function (request, response) {
            controller.create(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        return baseRoute.createRoutes({
            all: all,
            index: index,
            show: get,
            edit: get,
            create: create
        });

    })();
})(
        Injector.resolve({target: 'controllerResolver', resolutionName: 'sampleController'}),
        require(Injector.getBasePath() + '/routes/baseRoute')
    );