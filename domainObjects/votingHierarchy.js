(function (_, q, util, entity) {
    'use strict';

    var votingHierarchyDomainObject = function (parameters) {

        var parameters = parameters || {};

        entity.call(this);

        var _votingHierarchyId = parameters.votingHierarchyId || null;

        Object.defineProperty(this, 'votingHierarchyId', {
            enumerable: true, get: function () {
                return _votingHierarchyId;
            }
        });

        var _description = parameters.description || null;

        Object.defineProperty(this, 'description', {
            enumerable: true, get: function () {
                return _description;
            }
        });

        var _levels = [];


        this.setBasicInfo = function (votingHierarchyId, description) {
            _votingHierarchyId = votingHierarchyId || _votingHierarchyId;
            _description = description || _description;

            this.state = entity.EntityState.modified;
        };

        this.addLevel = function (level, parentLevel, descriptor, isVotable, acceptEligibleVoters) {
            if (!_.isFinite(level)) {
                throw Error("level is not a valid integer");
            }

            if (!(_.isNull(parentLevel)) && !(_.isFinite(parentLevel))) {
                throw Error("parentLevel is not a valid integer");
            }

            isVotable = isVotable || false;
            acceptEligibleVoters = acceptEligibleVoters || false;
            descriptor = descriptor || null;

            if (!_.isBoolean(isVotable)) {
                throw Error("isVotable is not a valid boolean");
            }

            if (!_.isBoolean(acceptEligibleVoters)) {
                throw Error("AcceptEligibleVoters is not a valid boolean");
            }

            if(!_.isNull(descriptor) && !_.isString(descriptor)) {
                throw Error("Descriptor is not a valid string");
            }

            var exists = _.filter(_levels, _.matches({
                    level: level,
                    parentLevel: parentLevel,
                    descriptor: descriptor
                })).length > 0;

            if(exists) {
                return;
            }

            _levels.push({
                level: level,
                parentLevel: parentLevel,
                descriptor: descriptor,
                isVotable: isVotable,
                acceptEligibleVoters: acceptEligibleVoters
            });
        }

        this.getLevels = function(level, parentLevel, descriptor, isVotable, acceptEligibleVoters) {
            var query = {};

            if (_.isFinite(level)) {
                query.level = level;
            }

            if (!(_.isNull(parentLevel)) && (_.isFinite(parentLevel))) {
                query.parentLevel = parentLevel;
            }

            descriptor = descriptor || null;

            if (_.isBoolean(isVotable)) {
                query.isVotable = isVotable;
            }

            if (_.isBoolean(acceptEligibleVoters)) {
                query.acceptEligibleVoters = acceptEligibleVoters;
            }

            if(!_.isNull(descriptor) && _.isString(descriptor)) {
                query.descriptor = descriptor;
            }

            return _.filter(_levels, _.matches(query));

        }

    };

    util.inherits(votingHierarchyDomainObject, entity);

    module.exports = votingHierarchyDomainObject;

})(require('lodash'), require('q'), require('util'), require(Injector.getBasePath() + '/domainObjects/entity'));

