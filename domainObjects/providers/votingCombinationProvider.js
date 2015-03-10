(function (DomainObject, Entity, q, _) {
    'use strict';

    module.exports = function (votingCombinationRepository) {

        var _repository = votingCombinationRepository;

        this.getVotingCombinationById = function (id) {
            var dfd = q.defer();

            _repository.getVotingCombinationById(id).then(function(entity){
                dfd.resolve(entity);
            }).fail(function(error) {
                dfd.reject(error);
            });

            return dfd.promise;        };

        this.getVotingCombinationByVotingDescriptorId = function (votingDescriptorId) {
            var dfd = q.defer();

            _repository.getVotingCombinationByVotingDescriptorId(votingDescriptorId).then(function(entities){
                dfd.resolve(entities);
            }).fail(function(error) {
                dfd.reject(error);
            });

            return dfd.promise;
        };

        this.create = function (parameters) {

            var domainObject = new DomainObject(parameters);
            domainObject.state = Entity.EntityState.inserted;
            return domainObject;
        };

    };

})(require(Injector.getBasePath() + '/domainObjects/votingCombination'), require(Injector.getBasePath() + '/domainObjects/entity'), require('q'), require('lodash'));