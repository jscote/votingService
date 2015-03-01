(function (q, util, entity) {
    'use strict';

    var eligibleVoterDomainObject = function(parameters){

        var parameters = parameters || {};

        entity.call(this);

        var _id = parameters.id || null;
        var _voterId = parameters.voterId || null;
        var _level = parameters.level || null;
        var _votingDescriptorId = parameters.votingDescriptorId || null;

        Object.defineProperty(this, 'id', {
            enumerable: true, get:
                function() {
                    return _id;
                }
        });

        Object.defineProperty(this, 'voterId', {
            enumerable: true, get:
                function() {
                    return _voterId;
                }
        });

        Object.defineProperty(this, 'level', {
            enumerable: true, get:
                function() {
                    return _level;
                }
        });

        Object.defineProperty(this, 'votingDescriptorId', {
            enumerable: true, get:
                function() {
                    return _votingDescriptorId;
                }
        });

        this.setBasicInfo = function (id, voterId, level, votingDescriptorId) {
            _id = id || _id;
            _voterId = voterId || _voterId;
            _level = level || _level;
            _votingDescriptorId = votingDescriptorId || _votingDescriptorId

            this.state = entity.EntityState.modified;
        };

    };

    util.inherits(eligibleVoterDomainObject, entity);



    module.exports = eligibleVoterDomainObject;

})(require('q'), require('util'), require(Injector.getBasePath() + '/domainObjects/entity'));

