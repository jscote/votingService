(function (q, es, DomainObject, identifier) {
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
                //TODO populate the domain object based on result
                var entity = new DomainObject();
                entity.addLevel();
                dfd.resolve(entity);
                return;
            }
            dfd.reject("Id doesn't exist for voting hierarchy");
        }).catch(function (error) {
            console.log(error);
            dfd.reject(error);
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
            id: msg.id,
            body: body
        }).then(function (result) {
            for (var i = 0; i < result.hits.hits.length; i) {
                var row = result.hits.hits[i]._source;
                var entity = new DomainObject({id: row.id});
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
})(require('q'), require('elasticsearch'), require(Injector.getBasePath() + 'domainObjects/voter'), require('jsai-identifier').Identifiers);