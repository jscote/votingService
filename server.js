#!/usr/bin/env node


var cluster = require('cluster');
var numCpus = require('os').cpus().length;
var queue = require('jsai-queuing');
var processor = require('jsai-jobprocessor');
var rules = require('jsai-ruleengine');

//Configure environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Get configuration file based on environment
var config = require('./config/config')[env];

//Configure Injection
require('./config/injection')(config.rootPath);

//Configure Express
var app = require('./config/express')({root: config.rootPath});

//Configure Passport
require('./config/passport')();

//Configure Routes
require('./config/routes')(app);

//Configure Queues
var queueConfig = require('./config/queue');
//wrap listeners for queues to map to processors
require('jsai-queuetoprocessor')(queueConfig);

queue.setup(queueConfig);

//Configure JobProcessors
processor.Processor.config(config);

//Configure RuleEngine
rules.RuleEngine.config(config);

var startListening = function (server) {
    server.listen(config.port, host, function () {
        console.log(
            'Web server listening on %s:%d within %s environment',
            host, config.port, server.set('env')
        );
    });
};

if (!module.parent) {
    //var port = process.env.PORT || 8000;
    var host = process.env.HOST || '0.0.0.0';


    //using only one core while developing as it is not debuggable with multiple core running

    if (env !== 'development') {
        if (cluster.isMaster) {
            // Fork workers.
            for (var i = 0; i < numCpus; i++) {
                cluster.fork();
            }

            cluster.on('exit', function (worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died');
            });
        } else {
            // Workers can share any TCP connection
            // In this case its a HTTP server
            startListening(app);

            //TODO: figure out what to do with queues in this case. A quick test reveals that setting up queues
            //here would result in having a consumer for each core. Is that what we want to do?
        }
    } else {
        startListening(app);
    }
}
