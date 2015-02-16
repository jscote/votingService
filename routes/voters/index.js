/**
 * Created by jscote on 10/20/13.
 */

(function (controllerResolver, baseRoute) {

    'use strict';

    module.exports = (function sampleRouteHandler() {
        var targetController = 'votersController';


        var index = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});
            if(controller.index) {
                controller.index(request).then(function (result) {
                    response.status(result.statusCode).send(result.data);
                })
            } else {
                response.send('405');
            }
        };

        var get = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});
            controller.get(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        var create = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});
            controller.create(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        var update = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});
            controller.update(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        return baseRoute.createRoutes({
            index: index,
            show: get,
            edit: get,
            create: create,
            update: update
        });

    })();
})(
        Injector.resolve({target: 'controllerResolver', resolutionName: 'votersController'}),
        require(Injector.getBasePath() + '/routes/baseRoute')
    );