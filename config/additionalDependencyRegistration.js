/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function(){

    'use strict';

    module.exports = function() {
        //add additional dependency registration here.
        Injector
            .register({dependency: '/controllers/SampleController', name: 'sampleController', resolutionName: '/:id/examples/:example.:format?'})
            .register({dependency: '/controllers/SampleController', name: 'sampleController', resolutionName: '/:id/examples.:format?'})
            .register({dependency: '/processorTasks/TestClasses::TestTaskNode', name: 'TestTaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test2TaskNode', name: 'Test2TaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test3TaskNode', name: 'Test3TaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test4TaskNode', name: 'Test4TaskNode'})
            .register({dependency: '/processorTasks/TestClasses::TestLoopTaskNode', name: 'TestLoopTaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test2LoopTaskNode', name: 'Test2LoopTaskNode'})
            .register({dependency: '/processorTasks/TestClasses::ConsoleLogNode', name: 'ConsoleLogNode'})
            .register({dependency: '/processorTasks/TestClasses::TestRequestCancellationTaskNode', name: 'TestRequestCancellationTaskNode'})
            .register({
                dependency: '/processorTasks/TestClasses::TestPredecessorToLoopTaskNode',
                name: 'TestPredecessorToLoopTaskNode'
            })
            .register({dependency: '/processorTasks/TestClasses::TestSuccessorToLoopTaskNode', name: 'TestSuccessorToLoopTaskNode'})
            .register({
                dependency: '/processorTasks/TestClasses::TestCompensationToLoopTaskNode',
                name: 'TestCompensationToLoopTaskNode'
            });
    }

})();