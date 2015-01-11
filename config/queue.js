/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function (jobProcessor, q) {

    'use strict';

    module.exports = {
        connection: {url: 'amqp://127.0.0.1?heartbeat=300'},
        startupHandler: function () {

        },
        types: [
            {
                type: 'CustomerUpdate', pattern: 'topic',
                mapToProcessor: true
            },
            {
                type: 'CustomerCreation', pattern: 'topic',
                mapToProcessor: true
            },
            {type: 'CustomerUpdated', pattern: 'fanout', listener: ''},
            {type: 'CustomerCreated', pattern: 'fanout', listener: ''}
        ]
    };

})(require('jsai-jobprocessor'), require('q'));