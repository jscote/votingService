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


    Repository.prototype.getVotingHierarchyById = function(id) {

        var dfd = q.defer();

        var client = new es.Client(new ConnectionConfiguration(config.connectionConfiguration));

        client.get({
            index: 'votes',
            type: 'votingHierarchy',
            id: id
        }).then(function (result) {
            if(result != null) {
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
        }).finally(function() {
            client.close();
        });

        return dfd.promise;


    };


    module.exports = Repository;
})(require('q'), require('elasticsearch'), require(Injector.getBasePath() + 'domainObjects/voter'), require('jsai-identifier').Identifiers);