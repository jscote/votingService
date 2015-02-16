/**
 * Created by jean-sebastiencote on 1/3/15.
 */
/**
 * Created by jscote on 10/20/13.
 */

(function (util, base, Permission, PermissionAnnotation, noAuthAnnotation, permissionEnum, httpApiResponse, q, queue, _, ident) {

    'use strict';


    function AllVotersController(serviceMessage) {
        if (!(this instanceof AllVotersController)) return new AllVotersController(serviceMessage);

        base.call(this);

        this.messaging = serviceMessage;

    }

    util.inherits(AllVotersController, base);

    AllVotersController.prototype.annotations =
        [new noAuthAnnotation()];

    AllVotersController.prototype.get = function (request) {
        //Should return all votes for a specific voter - Careful with the number of records that might be returned.

        var message = new this.messaging.ServiceMessage({data: {id: request.params.example}});
        var dfd = q.defer();

        dfd.resolve({someData: "this is all the votes for a voter"});

        return dfd.promise;
    };


    var processVote = function (messaging, request) {

        var dfd = q.defer();
        var msg = new messaging.ServiceMessage();
        var data = {};
        var response = msg.createServiceResponseFrom();

        //validate body of request
        var body = request.body;
        if (_.isUndefined(body.voterId) || _.isNull(body.voterId)) {
            response.addError("a voter Id needs to be specified")
        }

        if (_.isUndefined(body.votes) || _.isNull(body.votes) || !_.isArray(body.votes) || body.votes.length == 0) {
            response.addError("votes should be specified");
        } else {
            var hasVotesError = false;
            body.votes.forEach(function (item) {
                if (_.isUndefined(item.votingDescriptorId) || _.isNull(item.votingDescriptorId)) {
                    hasVotesError = true;
                }
            });

            if (hasVotesError) {
                response.addError("votes aren't properly defined. A voting descriptor id should be provided for each vote.");
            }
        }


        if (response.hasErrors) {
            dfd.resolve(response);
            return;
        }

        data.voterId = body.voterId;
        data.votes = [];
        var promises = [];
        body.votes.forEach(function (item) {
            promises.push(ident.Identifiers.getNextId('vote'));
            data.votes.push({
                votingDescriptorId: item.votingDescriptorId,
                voteTransactionDate: new Date()
            });
        });

        q.all(promises).then(function (values) {

            for (var i = 0; i < values.length; i++) {
                data.votes[i].voteId = values[i];
            }

            msg.data = data;
            response.data = data;

            var queueResponse = queue.send('VoteCreation', msg);


            if (!queueResponse.isSuccess) {
                queueResponse.errors.forEach(function (item) {
                    response.addError(item);
                });
            }

            dfd.resolve(response);
        }).fail(function(error) {
            dfd.reject(error);
        });

        return dfd.promise;
    };

    AllVotersController.prototype.create = function (request) {
        var dfd = q.defer();
        processVote(this.messaging, request).then(function (response) {
            dfd.resolve(response)
        }).fail(function (error) {
            dfd.resolve(error);
        });
        return dfd.promise;
    };
    AllVotersController.prototype.create.annotations = [new httpApiResponse.HttpStatusCode(202)];

    AllVotersController.prototype.update = function (request) {
        var dfd = q.defer();
        processVote(this.messaging, request).then(function (response) {
            dfd.resolve(response)
        }).fail(function (error) {
            dfd.resolve(error);
        });
        return dfd.promise;
    };
    AllVotersController.prototype.update.annotations = [new httpApiResponse.HttpStatusCode(202)];

    module.exports = AllVotersController;

})(require('util'),
    require(Injector.getBasePath() + '/controllers/permissionApiController'),
    require(Injector.getBasePath() + '/security/permissions'),
    require(Injector.getBasePath() + '/security/permissionAnnotation'),
    require(Injector.getBasePath() + '/security/noAuthRequiredAnnotation'),
    require(Injector.getBasePath() + '/security/permissionEnum'),
    require(Injector.getBasePath() + '/helpers/httpApiResponse'),
    require('q'),
    require('jsai-queuing'),
    require('lodash'),
    require('jsai-identifier')
);

