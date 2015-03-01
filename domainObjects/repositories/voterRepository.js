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

    var Repository = function(){

    };


    Repository.prototype.getVotersByVotingDescriptorId = function(id) {
        var entityList = [];

        var dfd = q.defer();

        var client = new es.Client(new ConnectionConfiguration(config.connectionConfiguration));

        //TODO The query here is more complex and probably need multiple requests.
        var body = {};

        client.search({
            index: 'votes',
            type: 'eligibleVoters',
            id: msg.id,
            body: body
        }).then(function (result) {
            for(var i = 0; i < result._source.length; i){
                var row = result._source[i];
                var entity = new DomainObject( {id : row.id});
                entity.state = Entity.EntityState.unchanged;
                entityList.push(entity);
            }
            dfd.resolve(entityList)
        }).catch(function (error) {
            console.log(error);
            dfd.reject(error);
        }).finally(function() {
            client.close();
        });

        return dfd.promise;


    };

    Repository.prototype.getVoterById = function(id) {
        var entity = null;

        var dfd = q.defer();

        identifier.identifierExists(id).then(function(isExisting) {
            if (isExisting) {
                var entity = new DomainObject({id: id});
                dfd.resolve(entity);
            } else {
                dfd.resolve(null);
            }
        }).fail(function(error){
            dfd.resolve(error);
        });

        return dfd.promise;
    };


    module.exports = Repository;
})(require('q'), require('elasticsearch'), require(Injector.getBasePath() + 'domainObjects/voter'), require('jsai-identifier').Identifiers);