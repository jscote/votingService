/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function (jobProcessor) {

    'use strict';

    module.exports = {
        connection: {url: 'amqp://127.0.0.1?heartbeat=300'},
        startupHandler: function () {

        },
        types: [
            {
                type: 'CustomerUpdate', pattern: 'topic', listener: function (msg) {
                console.log("inner function");
                console.log(msg);

                jobProcessor.Processor.getProcessor('CustomerUpdate').then(function (processor) {
                    processor.execute(msg);
                }).fail(function (error) {
                    //Put the message under an error queue
                });
            }
            },
            {type: 'CustomerUpdated', pattern: 'fanout', listener: ''},
            {type: 'CustomerCreated', pattern: 'fanout', listener: ''}
        ]
    };

})(require('jsai-jobprocessor'));