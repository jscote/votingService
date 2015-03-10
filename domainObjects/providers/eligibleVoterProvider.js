(function (DomainObject, Entity, q, _) {
    'use strict';

    module.exports = function (eligibleVoterRepository, votingCombinationProvider, votingHierarchyProvider) {

        var _repository = eligibleVoterRepository;
        var _votingCombinationProvider = votingCombinationProvider;
        var _votingHierarchyProvider = votingHierarchyProvider;

        this.getEligibleVoterById = function (id) {
            return _repository.getEligibleVoterById(id);
        };

        this.getEligibleVoterByVoterId = function (id) {
            return _repository.getEligibleVoterByVoterId(id);
        };

        this.getEligibleVotersByVotingDescriptorId = function (votingDescriptorId) {

            /*
             Logic:
             - Get VotingDescriptorId from votingCombination - If not present, then the votingDescriptorId won't have eligible voters
             - Determine which level and which hierarchy the voting descriptor belongs to
             - Get Hierarchy/Order level that accepts eligible voters from votingHierarchy where hierarchy and order are matching the previous step
             - Get votingDescriptorId at the level that matches where eligible voters are accepted by combining result from the first two steps
             - As a child votingDescriptorId should only have one parent, we should get only one votingDescriptorId
             - Get voterIds from eligible voters where the votingDescriptorId matches the one from previous step

             */

            var dfd = q.defer();

            _votingCombinationProvider.getVotingCombinationByVotingDescriptorId(votingDescriptorId).then(function (combinations) {

            });

            return dfd.promise;
        };

        this.create = function (parameters) {

            var domainObject = new DomainObject(parameters);
            domainObject.state = Entity.EntityState.inserted;
            return domainObject;
        };

    };

})(require(Injector.getBasePath() + '/domainObjects/eligibleVoter'), require(Injector.getBasePath() + '/domainObjects/entity'), require('q'), require('lodash'));