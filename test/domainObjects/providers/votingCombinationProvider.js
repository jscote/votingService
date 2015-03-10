/**
 * Created by jean-sebastiencote on 3/8/15.
 */

//Configure environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Get configuration file based on environment
var config = require('../../../config/config')[env];

global.Injector = require('jsai-injector');
global.Injector.setBasePath(config.rootPath);

global.Injector.register({
    dependency: '/domainObjects/providers/votingCombinationProvider',
    name: 'votingCombinationProvider'
})
    .register({
        dependency: '/domainObjects/repositories/votingCombinationRepository',
        name: 'votingCombinationRepository'
    });


module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    getVotingCombinationByVotingDescriptorId_WhenValidId_ReturnsAList: function (test) {
        var p = global.Injector.resolve({target: 'votingCombinationProvider'});
        p.getVotingCombinationByVotingDescriptorId("tim-1").then(function (combination) {
            test.ok(combination.length > 0, "should return at least one item");
            test.ok(combination[0].state == 0, "state should be unchanged");
            test.ok(combination[0].getVotingDescriptor({votingDescriptorId: "tim-1"}).length == 1, "should have the descriptor that was originally requested");
        }).finally(function () {
            test.done();
        });
    },
    getVotingCombinationByVotingDescriptorId_WhenInexistantId_ReturnsAnEmptyList: function (test) {
        var p = global.Injector.resolve({target: 'votingCombinationProvider'});
        p.getVotingCombinationByVotingDescriptorId("blah-1").then(function (combination) {
            test.ok(combination.length == 0, "should return at least one item");
        }).finally(function () {
            test.done();
        });
    },
    getVotingCombinationById_WhenValidId_ReturnsAnEntity: function (test) {
        var p = global.Injector.resolve({target: 'votingCombinationProvider'});
        p.getVotingCombinationByVotingDescriptorId("tim-1").then(function (combinations) {

            var id = combinations[0].votingCombinationId;
            p.getVotingCombinationById(id).then(function (combination) {

                test.ok(combination, "A combination must be found");
                test.ok(combination.votingCombinationId == id, "Id fetched should be the same as requested");
                test.ok(combination.state == 0, "state should be unchanged");


            }).finally(function () {
                test.done();
            });
        }).finally(function () {

        });
    },
    getVotingCombinationById_WhenInvalidId_ReturnsNull: function (test) {
        var p = global.Injector.resolve({target: 'votingCombinationProvider'});
        p.getVotingCombinationById("blah").then(function (combination) {

            test.ok(combination == null, "Should find nothing");


        }).finally(function () {
            test.done();
        });
    }
};
