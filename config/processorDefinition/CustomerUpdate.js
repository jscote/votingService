/**
 * Created by jean-sebastiencote on 1/10/15.
 */
(function () {

    module.exports = {
        version: '0.1.1',
        processorName: 'CustomerUpdate',
        nodeType: 'CompensatedNode',
        parameters: {
            compensationNode: {nodeType: 'NoOpTaskNode'},
            startNode: {
                nodeType: 'TestPredecessorToLoopTaskNode',
                parameters: {
                    successor: {
                        nodeType: 'LoopNode',
                        parameters: {
                            startNode: {
                                nodeType: 'TestLoopTaskNode',
                                parameters: {successor: {nodeType: 'Test2LoopTaskNode'}}
                            },
                            condition: ['CounterRuleSet'],
                            successor: {nodeType: 'TestSuccessorToLoopTaskNode'}
                        }
                    }
                }
            }
        }
    };


})();