/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function(){

    'use strict';

    module.exports = function() {
        //add additional dependency registration here.
        Injector.register({dependency: '/controllers/SampleController', name: 'sampleController', resolutionName: '/:id/examples/:example?/:op?'})

    }

})();