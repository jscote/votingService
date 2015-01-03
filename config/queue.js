/**
 * Created by jean-sebastiencote on 1/3/15.
 */
(function(){

    'use strict';

    module.exports = {
        connection: {url: 'amqp://127.0.0.1?heartbeat=10'},
        startupHandler: function () {

        },
        types: [
            {
                type: 'CustomerUpdate', pattern: 'topic', listener: function (msg) {
                console.log("inner function");
                console.log(msg);
            }
            },
            {type: 'CustomerUpdated', pattern: 'fanout', listener: ''},
            {type: 'CustomerCreated', pattern: 'fanout', listener: ''}
        ]
    };

})();