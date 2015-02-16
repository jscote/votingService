/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function () {

    'use strict';

    module.exports = {
        connection: {url: 'amqp://127.0.0.1?heartbeat=300'},
        startupHandler: function () {

        },
        types: [
            {
                type: 'VoteCreation', pattern: 'topic',
                mapToProcessor: true
            },
            {
                type: 'VoteDeletion', pattern: 'topic',
                mapToProcessor: true
            },
            {type: 'VoteAdded', pattern: 'fanout', listener: ''},
            {type: 'VoteDeleted', pattern: 'fanout', listener: ''},
            {type: 'VoteRejected', pattern: 'fanout', listener: ''}
        ]
    };

})();