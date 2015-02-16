/**
 * Created by jscote on 10/20/13.
 */

(function (controllerResolver, baseRoute) {

    'use strict';

    module.exports = (function sampleRouteHandler() {
        var targetController = 'votingDescriptorsController';

        var get = function (request, response) {
            var controller = controllerResolver.getController({targetController: targetController, parameters: request});
            controller.get(request).then(function (result) {
                response.status(result.statusCode).send(result.data);
            });

        };

        return baseRoute.createRoutes({
            show: get
        });

    })();
})(
        Injector.resolve({target: 'controllerResolver', resolutionName: 'paramsVotersController'}),
        require(Injector.getBasePath() + '/routes/baseRoute')
    );