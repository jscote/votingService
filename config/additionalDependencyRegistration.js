/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function () {

    'use strict';

    module.exports = function () {
        //add additional dependency registration here.
        Injector
            .register({
                dependency: '/helpers/voteStrategyResolver',
                name: 'strategyResolver',
                resolutionName: 'paramsVotersController'
            })
            .register({
                dependency: '/controllers/allVotingDescriptorsController',
                name: 'votingDescriptorsController',
                resolutionName: '/:id/votes/:vote/votingDescriptors/:votingDescriptor.:format?|vote:all'
            })
            .register({
                dependency: '/controllers/remainingVotingDescriptorsController',
                name: 'votingDescriptorsController',
                resolutionName: '/:id/votes/:vote/votingDescriptors/:votingDescriptor.:format?|vote:remaining'
            })
            .register({
                dependency: '/controllers/allVotersController',
                name: 'votersController',
                resolutionName: '/:id/votes/:vote/voters.:format?|vote:all'
            })
            .register({
                dependency: '/controllers/remainingVotersController',
                name: 'votersController',
                resolutionName: '/:id/votes/:vote/voters.:format?|vote:remaining'
            })
            .register({
                dependency: '/controllers/allVotersController',
                name: 'votersController',
                resolutionName: '/:id/votes/:vote/voters/:voter.:format?|vote:all'
            })
            .register({
                dependency: '/controllers/remainingVotersController',
                name: 'votersController',
                resolutionName: '/:id/votes/:vote/voters/:voter.:format?|vote:remaining'
            })

            .register({dependency: '/processorTasks/ValidateVoter', name: 'ValidateVoter'})
            .register({dependency: '/processorTasks/ValidateVotingItems', name: 'ValidateVotingItems'});
    }

})();