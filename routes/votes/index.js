/**
 * Created by jscote on 10/20/13.
 */

(function (baseRoute) {

    'use strict';

    module.exports = (function voteRouteHandler() {
        return baseRoute.createRoutes({});

    })();
})(
        require(Injector.getBasePath() + '/routes/baseRoute')
    );