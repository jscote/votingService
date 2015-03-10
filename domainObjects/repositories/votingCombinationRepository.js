(function (q, es, Entity, DomainObject) {
    'use strict';

    //Configure environment
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Get configuration file based on environment
    var config = require('../../config/config')[env].voterConnection;

    var ConnectionConfiguration = function (config) {
        for (var prop in config) {
            this[prop] = config[prop];
        }
    };

    var Repository = function () {

    };


    Repository.prototype.getVotingCombinationById = function (id) {

        var dfd = q.defer();

        var client = new es.Client(new ConnectionConfiguration(config.connectionConfiguration));

        client.get({
            index: 'votes',
            type: 'votingCombination',
            id: id
        }).then(function (result) {
            if (result != null) {
                var row = result._source;
                var entity = new DomainObject({
                    votingCombinationId: result._id,
                    votingHierarchyId: row.votingHierarchyId
                });

                row.votingDescriptors.forEach(function (item) {
                    entity.addVotingDescriptor({
                        votingDescriptorId: item.votingDescriptorId,
                        isVotingLocked: item.isVotingLocked,
                        level: item.level
                    });
                });

                entity.state = Entity.EntityState.unchanged;

                dfd.resolve(entity);
            } else {
                dfd.resolve(null);
            }
        }).catch(function (error) {
            if(error.status == 404) {
                dfd.resolve(null);
            } else {
                console.log(error);
                dfd.reject(error);
            }
        }).finally(function () {
            client.close();
        });

        return dfd.promise;


    };

    Repository.prototype.getVotingCombinationByVotingDescriptorId = function (id) {
        var entityList = [];

        var dfd = q.defer();

        var client = new es.Client(new ConnectionConfiguration(config.connectionConfiguration));

        var body = {
            query: {
                nested: {
                    path: "votingDescriptors",
                    query: {
                        match: {
                            votingDescriptorId: id
                        }
                    }
                }
            }
        };

        client.search({
            index: 'votes',
            type: 'votingCombination',
            body: body
        }).then(function (result) {
            for (var i = 0; i < result.hits.hits.length; i++) {
                var row = result.hits.hits[i]._source;
                var entity = new DomainObject({
                    votingCombinationId: result.hits.hits[i]._id,
                    votingHierarchyId: row.votingHierarchyId
                });

                row.votingDescriptors.forEach(function (item) {
                    entity.addVotingDescriptor({
                        votingDescriptorId: item.votingDescriptorId,
                        isVotingLocked: item.isVotingLocked,
                        level: item.level
                    });
                });

                entity.state = Entity.EntityState.unchanged;
                entityList.push(entity);
            }
            dfd.resolve(entityList)
        }).catch(function (error) {
            console.log(error);
            dfd.reject(error);
        }).finally(function () {
            client.close();
        });

        return dfd.promise;


    };


    module.exports = Repository;
})(
    require('q'),
    require('elasticsearch'),
    require(Injector.getBasePath() + 'domainObjects/entity'),
    require(Injector.getBasePath() + 'domainObjects/votingCombination')
);