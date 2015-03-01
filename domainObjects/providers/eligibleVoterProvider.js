(function (DomainObject, Entity) {
    'use strict';

    module.exports = function (eligibleVoterRepository) {

        var _repository = voterRepository;

        this.getEligibleVoterById = function (id) {
            return _repository.getEligibleVoterById(id);
        };

        this.getEligibleVoterByVoterId = function (id) {
            return _repository.getEligibleVoterByVoterId(id);
        };

        this.create = function (parameters) {

            var domainObject = new DomainObject(parameters);
            domainObject.state = Entity.EntityState.inserted;
            return domainObject;
        };

    };

})(require(Injector.getBasePath() + '/domainObjects/eligibleVoter'), require(Injector.getBasePath() + '/domainObjects/entity'));