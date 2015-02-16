/**
 * Created by jscote on 10/20/13.
 */

(function (controllerResolver, baseRoute) {

    'use strict';

    module.exports = (function sampleRouteHandler() {
        var targetController = 'votersController';

        var get = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});

            if(controller == undefined) {
                response.send("405", {error: "This type of request is not supported for the requested resource"});
                return;
            }

            controller.get(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        var create = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});

            if(controller == undefined) {
                response.send("405", {error: "This type of request is not supported for the requested resource"});
                return;
            }

            controller.create(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        var update = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});

            if(controller == undefined) {
                response.send("405", {error: "This type of request is not supported for the requested resource"});
                return;
            }

            controller.update(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        return baseRoute.createRoutes({
            show: get,
            create: create,
            update: update
        });

    })();
})(
        Injector.resolve({target: 'controllerResolver', resolutionName: 'paramsVotersController'}),
        require(Injector.getBasePath() + '/routes/baseRoute')
    );