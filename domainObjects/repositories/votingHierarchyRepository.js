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

    var Repository = function(){

    };


    Repository.prototype.getVotingHierarchyById = function(id) {

        var dfd = q.defer();

        var client = new es.Client(new ConnectionConfiguration(config.connectionConfiguration));

        client.get({
            index: 'votes',
            type: 'votingHierarchy',
            id: id
        }).then(function (result) {
            if (result != null) {
                var row = result._source;
                var entity = new DomainObject({
                    votingHierarchyId: result._id,
                    description: row.description
                });

                row.levels.forEach(function (item) {
                    entity.addLevel({
                        level: item.level,
                        parentLevel: item.parentLevel,
                        descriptor: item.descriptor,
                        isVotable: item.isVotable,
                        acceptEligibleVoters: item.acceptEligibleVoters
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


    module.exports = Repository;
})(
    require('q'),
    require('elasticsearch'),
    require(Injector.getBasePath() + 'domainObjects/entity'),
    require(Injector.getBasePath() + 'domainObjects/votingHierarchy')
);