(function (q, util, entity) {
    'use strict';

    var voterDomainObject = function(parameters){

        var parameters = parameters || {};

        var _voterProvider = Injector.resolve({target: 'voterProvider'});

        entity.call(this);

        var _voterId = parameters.voterId || null;

        Object.defineProperty(this, 'voterId', {
            enumerable: true, get:
                function() {
                    return _voterId;
                }
        });

        this.setBasicInfo = function (voterId) {
            _voterId = voterId || _voterId;

            this.state = entity.EntityState.modified;
        };

        this.isValidForAVotingDescriptor = function(votingDescriptorId) {
            //TODO: This should use different provider and have the business logic within this method
            // The logic involved retrieving different parts such as eligible voters, which voting descriptor is votable, etc.
            // As it is the logic, lets express it explicitly in this business method!

            var dfd = q.defer();
            _voterProvider.isVoterValidVotingDescriptorId(this.voterId, votingDescriptorId).then(function(result) {
                dfd.resolve(result);
            }).fail(function(error) {
                dfd.reject(error);
            });

            return dfd.promise;
        }

    };

    util.inherits(voterDomainObject, entity);



    module.exports = voterDomainObject;

})(require('q'), require('util'), require(Injector.getBasePath() + '/domainObjects/entity'));

