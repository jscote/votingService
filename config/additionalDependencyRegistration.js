/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function () {

    'use strict';

    module.exports = function () {
        //add additional dependency registration here.
        Injector
            .register({
                dependency: '/controllers/votingDescriptorTypesController',
                name: 'votingDescriptorTypesController',
                resolutionName: '/:id/votingDescriptorTypes/:votingDescriptorType.:format?'
            })
            .register({
                dependency: '/controllers/votingDescriptorTypesController',
                name: 'votingDescriptorTypesController',
                resolutionName: '/:id/votingDescriptorTypes.:format?'
            })
            .register({
                dependency: '/controllers/votersController',
                name: 'votersController',
                resolutionName: '/:id/votingDescriptorTypes/:votingDescriptorType/voters.:format?'
            })
            .register({
                dependency: '/controllers/votersController',
                name: 'votersController',
                resolutionName: '/:id/votingDescriptorTypes/:votingDescriptorType/voters/:voter.:format?'
            })
            .register({dependency: '/processorTasks/TestClasses::TestTaskNode', name: 'TestTaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test2TaskNode', name: 'Test2TaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test3TaskNode', name: 'Test3TaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test4TaskNode', name: 'Test4TaskNode'})
            .register({dependency: '/processorTasks/TestClasses::TestLoopTaskNode', name: 'TestLoopTaskNode'})
            .register({dependency: '/processorTasks/TestClasses::Test2LoopTaskNode', name: 'Test2LoopTaskNode'})
            .register({dependency: '/processorTasks/TestClasses::ConsoleLogNode', name: 'ConsoleLogNode'})
            .register({
                dependency: '/processorTasks/TestClasses::TestRequestCancellationTaskNode',
                name: 'TestRequestCancellationTaskNode'
            })
            .register({
                dependency: '/processorTasks/TestClasses::TestPredecessorToLoopTaskNode',
                name: 'TestPredecessorToLoopTaskNode'
            })
            .register({
                dependency: '/processorTasks/TestClasses::TestSuccessorToLoopTaskNode',
                name: 'TestSuccessorToLoopTaskNode'
            })
            .register({
                dependency: '/processorTasks/TestClasses::TestCompensationToLoopTaskNode',
                name: 'TestCompensationToLoopTaskNode'
            });
    }

})();