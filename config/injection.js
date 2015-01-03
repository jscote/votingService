/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function () {

    'use strict';

    module.exports = function (baseDir) {

        global.Injector = require('jsai-injector');
        global.Injector.setBasePath(baseDir);
        require(baseDir + './config/baseDependencyRegistration')();
        require(baseDir + './config/additionalDependencyRegistration')();
    };

})();