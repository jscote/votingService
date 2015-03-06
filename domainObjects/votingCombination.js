(function (_, q, util, entity) {
    'use strict';

    var votingCombinationDomainObject = function (parameters) {

        var parameters = parameters || {};

        entity.call(this);

        var _votingCombinationId;
        var _votingHierarchyId;

        Object.defineProperty(this, 'votingCombinationId', {
            enumerable: true, get: function () {
                return _votingCombinationId;
            }
        });



        Object.defineProperty(this, 'votingHierarchyId', {
            enumerable: true, get: function () {
                return _votingHierarchyId;
            }
        });

        var _votingDescriptors = [];


        this.setBasicInfo = function (params) {

            if (!_.isString(params.votingHierarchyId) || _.isEmpty(params.votingHierarchyId))
                throw Error("Voting HierarchyId should be a valid string");

            if (!_.isString(params.votingCombinationId) || _.isEmpty(params.votingCombinationId))
                throw Error("Voting CombinationId should be a valid string");

            _votingCombinationId = params.votingCombinationId || _votingCombinationId;
            _votingHierarchyId = params.votingHierarchyId || _votingHierarchyId;

            this.state = entity.EntityState.modified;
        };

        this.addVotingDescriptor = function (addParams) {
            if (!_.isFinite(addParams.level)) {
                throw Error("level is not a valid integer");
            }

            addParams.votingDescriptorId = addParams.votingDescriptorId || null;

            if (_.isNull(addParams.votingDescriptorId) || !_.isString(addParams.votingDescriptorId) || _.isEmpty(addParams.votingDescriptorId)) {
                throw Error("Voting Descriptor id should be a valid string");
            }

            addParams.isVotingLocked = addParams.isVotingLocked || false;

            if (!_.isBoolean(addParams.isVotingLocked)) {
                throw Error("isVotingLocked is not a valid boolean");
            }

            var exists = (_.filter(_votingDescriptors, _.matches({
                    level: addParams.level
                })).length) + (_.filter(_votingDescriptors, _.matches({
                    votingDescriptorId: addParams.votingDescriptorId
                })).length) > 0;

            if(exists) {
                return;
            }

            _votingDescriptors.push({
                level: addParams.level,
                votingDescriptorId: addParams.votingDescriptorId,
                isVotingLocked: addParams.isVotingLocked
            });
        };

        this.getVotingDescriptors = function(queryParams) {
            var query = {};

            if(_.isUndefined(queryParams)) return _votingDescriptors;

            if (_.isFinite(queryParams.level)) {
                query.level = queryParams.level;
            }

            queryParams.votingDescriptorId = queryParams.votingDescriptorId || null;

            if ((!_.isNull(queryParams.votingDescriptorId) || !_.isEmpty(queryParams.votingDescriptorId)) && _.isString(queryParams.votingDescriptorId)) {
                query.votingDescriptorId = queryParams.votingDescriptorId;
            }
            
            return _.filter(_votingDescriptors, _.matches(query));

        };

        this.setBasicInfo(parameters);

        return this;

    };

    util.inherits(votingCombinationDomainObject, entity);

    module.exports = votingCombinationDomainObject;

})(require('lodash'), require('q'), require('util'), require(Injector.getBasePath() + '/domainObjects/entity'));

