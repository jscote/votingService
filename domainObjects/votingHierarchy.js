(function (_, q, util, entity) {
    'use strict';

    var votingHierarchyDomainObject = function (parameters) {

        var parameters = parameters || {};

        entity.call(this);

        var _votingHierarchyId;
        var _description;

        Object.defineProperty(this, 'votingHierarchyId', {
            enumerable: true, get: function () {
                return _votingHierarchyId;
            }
        });


        Object.defineProperty(this, 'description', {
            enumerable: true, get: function () {
                return _description;
            }
        });

        var _levels = [];


        this.setBasicInfo = function (params) {

            if (!_.isString(params.votingHierarchyId) || _.isEmpty(params.votingHierarchyId))
                throw Error("Voting HierarchyId should be a valid string");

            if (!_.isString(params.description) || _.isEmpty(params.description))
                throw Error("Voting HierarchyId should be a valid string");

            _votingHierarchyId = params.votingHierarchyId || _votingHierarchyId;
            _description = params.description || _description;

            this.state = entity.EntityState.modified;
        };

        this.addLevel = function (addParams) {
            if (!_.isFinite(addParams.level)) {
                throw Error("level is not a valid integer");
            }

            if (!(_.isNull(addParams.parentLevel)) && !(_.isFinite(addParams.parentLevel))) {
                throw Error("parentLevel is not a valid integer");
            }

            addParams.isVotable = addParams.isVotable || false;
            addParams.acceptEligibleVoters = addParams.acceptEligibleVoters || false;
            addParams.descriptor = addParams.descriptor || null;

            if (!_.isBoolean(addParams.isVotable)) {
                throw Error("isVotable is not a valid boolean");
            }

            if (!_.isBoolean(addParams.acceptEligibleVoters)) {
                throw Error("AcceptEligibleVoters is not a valid boolean");
            }

            if (_.isNull(addParams.descriptor) || !_.isString(addParams.descriptor) || _.isEmpty(addParams.descriptor)) {
                throw Error("Descriptor is not a valid string");
            }

            var exists = _.filter(_levels, _.matches({
                    level: addParams.level,
                    parentLevel: addParams.parentLevel,
                    descriptor: addParams.descriptor
                })).length > 0;

            if (exists) {
                return;
            }

            _levels.push({
                level: addParams.level,
                parentLevel: addParams.parentLevel,
                descriptor: addParams.descriptor,
                isVotable: addParams.isVotable,
                acceptEligibleVoters: addParams.acceptEligibleVoters
            });

            this.state = entity.EntityState.modified;
        };

        this.getLevels = function (queryParams) {
            var query = {};

            if (_.isUndefined(queryParams))
                return _levels;

            if (_.isFinite(queryParams.level)) {
                query.level = queryParams.level;
            }

            if (!(_.isNull(queryParams.parentLevel)) && (_.isFinite(queryParams.parentLevel))) {
                query.parentLevel = queryParams.parentLevel;
            }

            queryParams.descriptor = queryParams.descriptor || null;

            if (_.isBoolean(queryParams.isVotable)) {
                query.isVotable = queryParams.isVotable;
            }

            if (_.isBoolean(queryParams.acceptEligibleVoters)) {
                query.acceptEligibleVoters = queryParams.acceptEligibleVoters;
            }

            if (!_.isNull(queryParams.descriptor) && _.isString(queryParams.descriptor)) {
                query.descriptor = queryParams.descriptor;
            }

            return _.filter(_levels, _.matches(query));

        };

        this.setBasicInfo(parameters);

        return this;

    };

    util.inherits(votingHierarchyDomainObject, entity);

    module.exports = votingHierarchyDomainObject;

})(require('lodash'), require('q'), require('util'), require(Injector.getBasePath() + '/domainObjects/entity'));

