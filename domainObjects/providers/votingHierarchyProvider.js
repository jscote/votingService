(function (DomainObject, Entity, q) {
    'use strict';

    module.exports = function (votingHierarchyRepository) {

        var _repository = votingHierarchyRepository;

        this.getVotingHierarchyById = function (id) {
            var dfd = q.defer();
            _repository.getVotingHierarchyById(id).then(function(entity) {
                dfd.resolve(entity);
            }).fail(function(error){
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

})(
    require(Injector.getBasePath() + '/domainObjects/votingHierarchy'),
    require(Injector.getBasePath() + '/domainObjects/entity'),
    require('q')
);