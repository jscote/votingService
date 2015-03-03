(function (_, q, util, entity) {
    'use strict';

    var votingCombinationDomainObject = function (parameters) {

        var parameters = parameters || {};

        entity.call(this);

        var _votingCombinationId = parameters.votingCombinationId || null;

        Object.defineProperty(this, 'votingCombinationId', {
            enumerable: true, get: function () {
                return _votingCombinationId;
            }
        });

        var _votingHierarchyId = parameters._votingHierarchyId || null;

        Object.defineProperty(this, 'votingHierarchyId', {
            enumerable: true, get: function () {
                return _votingHierarchyId;
            }
        });

        var _votingDescriptors = [];


        this.setBasicInfo = function (votingCombinationId, votingHierarchyId) {
            _votingCombinationId = votingCombinationId || _votingCombinationId;
            _votingHierarchyId = votingHierarchyId || _votingHierarchyId;

            this.state = entity.EntityState.modified;
        };

        this.addVotingDescriptor = function (level, votingDescriptorId, isVotingLocked) {
            if (!_.isFinite(level)) {
                throw Error("level is not a valid integer");
            }

            if (_.isNull(votingDescriptorId)) {
                throw Error("Voting Descriptor id should be provided");
            }

            isVotingLocked = isVotingLocked || false;

            if (!_.isBoolean(isVotingLocked)) {
                throw Error("isVotingLocked is not a valid boolean");
            }

            var exists = (_.filter(_votingDescriptors, _.matches({
                    level: level
                })).length) + (_.filter(_votingDescriptors, _.matches({
                    votingDescriptorId: votingDescriptorId
                })).length) > 0;

            if(exists) {
                return;
            }

            _votingDescriptors.push({
                level: level,
                votingDescriptorId: votingDescriptorId,
                isVotingLocked: isVotingLocked
            });
        }

        this.getVotingDescriptor = function(level, votingDescriptor, isVotingLocked) {
            var query = {};

            if (_.isFinite(level)) {
                query.level = level;
            }

            votingDescriptor = votingDescriptor || null;

            if (_.isBoolean(isVotingLocked)) {
                query.isVotingLocked = isVotingLocked;
            }

            if (_.isBoolean(acceptEligibleVoters)) {
                query.acceptEligibleVoters = acceptEligibleVoters;
            }

            if(!_.isNull(votingDescriptor) && _.isString(votingDescriptor)) {
                query.votingDescriptor = votingDescriptor;
            }
            
            return _.filter(_votingDescriptors, _.matches(query));

        }

    };

    util.inherits(votingCombinationDomainObject, entity);

    module.exports = votingCombinationDomainObject;

})(require('lodash'), require('q'), require('util'), require(Injector.getBasePath() + '/domainObjects/entity'));

