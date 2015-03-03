(function (DomainObject, Entity) {
    'use strict';

    module.exports = function (votingHierarchyRepository) {

        var _repository = votingHierarchyRepository;

        this.getVotingHierarchyById = function (id) {
            return _repository.getVotingHierarchyById(id);
        };

        this.create = function (parameters) {

            var domainObject = new DomainObject(parameters);
            domainObject.state = Entity.EntityState.inserted;
            return domainObject;
        };

    };

})(require(Injector.getBasePath() + '/domainObjects/votingHierarchy'), require(Injector.getBasePath() + '/domainObjects/entity'));