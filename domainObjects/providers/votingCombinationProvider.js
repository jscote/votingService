(function (DomainObject, Entity) {
    'use strict';

    module.exports = function (votingCombinationRepository) {

        var _repository = votingCombinationRepository;

        this.getVotingCombinationById = function (id) {
            return _repository.getVotingCombinationById(id);
        };

        this.getVotingCombinationByVotingDescriptorId = function (votingDescriptorId) {
            return _repository.getVotingCombinationByVotingDescriptorId(votingDescriptorId);
        };

        this.create = function (parameters) {

            var domainObject = new DomainObject(parameters);
            domainObject.state = Entity.EntityState.inserted;
            return domainObject;
        };

    };

})(require(Injector.getBasePath() + '/domainObjects/votingCombination'), require(Injector.getBasePath() + '/domainObjects/entity'));