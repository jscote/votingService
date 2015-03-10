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
    dependency: '/domainObjects/providers/votingHierarchyProvider',
    name: 'votingHierarchyProvider'
})
    .register({
        dependency: '/domainObjects/repositories/votingHierarchyRepository',
        name: 'votingHierarchyRepository'
    });


module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    getVotingHierarchyById_WhenValidId_ReturnsAnEntity: function (test) {
        var p = global.Injector.resolve({target: 'votingHierarchyProvider'});
        p.getVotingHierarchyById("1").then(function (combination) {

            test.ok(combination, "A hierarchy must be found");
            test.ok(combination.votingHierarchyId == "1", "Id fetched should be the same as requested");
            test.ok(combination.state == 0, "state should be unchanged");


        }).finally(function () {
            test.done();
        });

    },
    getVotingHierarchyById_WhenInvalidId_ReturnsNull: function (test) {
        var p = global.Injector.resolve({target: 'votingHierarchyProvider'});
        p.getVotingHierarchyById("blah").then(function (combination) {

            test.ok(combination == null, "Should find nothing");


        }).finally(function () {
            test.done();
        });
    }

};
