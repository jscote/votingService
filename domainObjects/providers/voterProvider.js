(function (DomainObject, Entity) {
    'use strict';

    module.exports = function (voterRepository) {

        var _repository = voterRepository;

        this.getVoterById = function (id) {
            return _repository.getVoterById(id);
        };

        this.getVotersByVotingDescriptorId = function (votingDescriptorId) {
            return _repository.getVotersByVotingDescriptorId(votingDescriptorId);
        };

        this.isVoterValidVotingDescriptorId = function (voterId, votingDescriptorId) {
            return _repository.isVoterValidVotingDescriptorId(voterId, votingDescriptorId);
        };

        this.create = function (parameters) {

            var domainObject = new DomainObject(parameters);
            domainObject.state = Entity.EntityState.inserted;
            return domainObject;
        };

    };

})(require(Injector.getBasePath() + '/domainObjects/voter'), require(Injector.getBasePath() + '/domainObjects/entity'));