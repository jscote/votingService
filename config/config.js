/**
 * Created by jean-sebastiencote on 1/3/15.
 */

(function (path) {

    'use strict';

    var rootPath = path.normalize(__dirname + '/../');

    module.exports = {
        development: {
            rootPath: rootPath,
            port: process.env.PORT || 8000,

            //db
            dbhost: 'localhost',
            dbPort: 5432,
            dbName: 'loyally',
            dbUserName: 'postgres',
            dbPassword: 'postgres',
            processorPath: path.join(rootPath, 'config/processorDefinition'),
            ruleSetPath: path.join(rootPath, 'config/ruleSetDefinition'),
            rulePath: path.join(rootPath, 'config/ruleDefinition'),
            serviceMessage: {connectionConfiguration: {host: 'localhost:9200'}},
            identifiers: {
                connectionConfiguration: {host: 'localhost:9200'},
                supportedTypes: [{supportedType: 'vote', abbreviation: 'vte'}, {supportedType: 'voter', abbreviation: 'vtr'}]
            },
            voterConnection: {
                connectionConfiguration: {host: 'localhost:9200'}
            }
        },
        production: {
            rootPath: rootPath,
            port: process.env.PORT || 80,

            //db
            dbhost: 'localhost',
            dbPort: 5432,
            dbName: 'loyally',
            dbUserName: 'postgres',
            dbPassword: 'postgres',
            processorPath: path.join(rootPath, 'config/processorDefinition'),
            ruleSetPath: path.join(rootPath, 'config/ruleSetDefinition'),
            rulePath: path.join(rootPath, 'config/ruleDefinition')
        }
    }
})(require('path'));