/**
 * Created by jean-sebastiencote on 1/10/15.
 */
(function () {

    module.exports = {
        version: '0.1.1',
        processorName: 'intervalProcessor',
        nodeType: 'CompensatedNode',
        parameters: {
            compensationNode: {nodeType: 'NoOpTaskNode'},
            startNode: {
                nodeType: 'ConsoleLogNode'
            }
        }
    };


})();