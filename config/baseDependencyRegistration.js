/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function (_, decoratorHelper, apiControllerTransformResultDecorator, controllerPermissionDecorator, baseControllerDecorator) {

    module.exports = function () {
        console.log('Configuring the injection container');
        console.log('dirname is: ' + Injector.getBasePath());
        Injector
            .decorator(require(Injector.getBasePath() + '/controllers/apiController'), function (delegateClass) {
                decoratorHelper.decorateFunctions(delegateClass, apiControllerTransformResultDecorator(delegateClass));
                return delegateClass;
            })
            .decorator(require(Injector.getBasePath() + '/controllers/permissionApiController'), function (delegateClass) {
                decoratorHelper.decorateFunctions(delegateClass, controllerPermissionDecorator(delegateClass));
                return delegateClass;
            })
            .decorator(require(Injector.getBasePath() + '/controllers/baseController'), function (delegateClass) {
                decoratorHelper.decorateFunctions(delegateClass, baseControllerDecorator(delegateClass));
                return delegateClass;
            })
            .register({dependency: '/helpers/strategyResolver', name: 'strategyResolver'})
            .register({dependency: require('jsai-servicemessage'), name: 'serviceMessage'})
            .register({dependency: '/helpers/controllerResolver', name: 'controllerResolver'})
    }
})
(
    require('lodash'),
    require(Injector.getBasePath() + '/helpers/decoratorHelper'),
    require(Injector.getBasePath() + '/decorators/apiControllerTransformResultDecorator'),
    require(Injector.getBasePath() + '/decorators/controllerPermissionDecorator'),
    require(Injector.getBasePath() + '/decorators/baseControllerDecorator')
);