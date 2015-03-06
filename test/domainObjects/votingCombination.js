/**
 * Created by jscote on 3/8/14.
 */

//Configure environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Get configuration file based on environment
var config = require('../../config/config')[env];

global.Injector = require('jsai-injector');
global.Injector.setBasePath(config.rootPath);

var domainObject = require('../../domainObjects/votingCombination');
var provider = require('../../domainObjects/providers/votingCombinationProvider');


module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    create_whenFromProvider_IsNotNull: function (test) {

        var p = new provider();
        var obj = p.create({votingCombinationId: "1", votingHierarchyId: "1"});

        test.ok(obj, "Domain Object should be created");
        test.ok(obj.state == 1, "State should be set to 1 for inserted");
        test.done();
    },
    create_whenInvalidHierarchyId_willThrow: function (test) {

        var p = new provider();
        test.throws(function () {
            var obj = p.create({votingCombinationId: "toto"})
        });


        test.done();
    },
    create_whenInvalidCombinationId_willThrow: function (test) {

        var p = new provider();
        test.throws(function () {
            var obj = p.create({votingHierarchyId: "toto"})
        });


        test.done();
    },
    create_whenFromProviderWithParameters_setsProperties: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});

        test.ok(obj, "Domain Object should be created");
        test.ok(obj.state == 1, "State should be set to 1 for inserted");
        test.ok(obj.votingHierarchyId == "1", "Id should be 1");
        test.ok(obj.votingCombinationId == "1", "description should be set correctly");
        test.done();
    },
    create_whenFromProviderWithInvalidParameters_willFail: function (test) {
        var p = new provider();
        test.throws(function () {
            var obj = p.create({votingHierarchyId: 1, votingCombinationId: "1"});
        });
        test.done();
    },
    addVotingDescriptor_withLevel_IsAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "1"});
        test.ok(obj.getVotingDescriptors({level: 2}).length == 1, "Should have one level");
        test.done();

    },
    addVotingDescriptor_withSameLevelTwice_isAddedOnlyOnce: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "2"});
        test.ok(obj.getVotingDescriptors({level: 2}).length == 1, "Should have one level");
        test.done();
    },
    addVotingDescriptor_withSameVotingDescriptorTwice_isAddedOnlyOnce: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 1, votingDescriptorId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "1"});
        test.ok(obj.getVotingDescriptors({votingDescriptorId: "1"}).length == 1, "Should have one level");
        test.done();
    },
    addVotingDescriptor_withDifferentLevels_isAddedAppropriately: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 1, votingDescriptorId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "2"});
        test.ok(obj.getVotingDescriptors().length == 2, "Should have two level");
        test.done();
    },
    getVotingDescriptors_withoutParameters_returnsAll: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 1, votingDescriptorId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "2"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "3"});
        test.ok(obj.getVotingDescriptors().length == 2, "Should have two level");
        test.done();
    },
    getVotingDescriptors_withLevel_returnsProperly: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 1, votingDescriptorId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "2"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "3"});
        test.ok(obj.getVotingDescriptors({level: 1}).length == 1, "Should have one level");
        test.done();
    },
    getVotingDescriptors_withVotingDescriptorId_returnsProperly: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        obj.addVotingDescriptor({level: 1, votingDescriptorId: "1"});
        obj.addVotingDescriptor({level: 2, votingDescriptorId: "2"});
        obj.addVotingDescriptor({level: 3, votingDescriptorId: "3"});
        test.ok(obj.getVotingDescriptors({votingDescriptorId: "3"}).length == 1, "Should have one level");
        test.done();
    },
    addVotingDescriptor_WithInvalidLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        test.throws(function () {
            obj.addVotingDescriptor({
                level: "1",
                votingDescriptorId: "1"
            });
        });
        test.done();
    },
    addVotingDescriptor_WithInvalidVotingDescriptorId_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        test.throws(function () {
            obj.addVotingDescriptor({
                level: 1,
                votingDescriptorId: 1
            });
        });
        test.done();
    },
    addVotingDescriptor_WithUndefinedDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        test.throws(function () {
            obj.addVotingDescriptor({level: 1});
        });
        test.done();
    },
    addVotingDescriptor_WithEmptyDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        test.throws(function () {
            obj.addVotingDescriptor({level: 1, votingDescriptorId: ""});
        });
        test.done();
    },
    addVotingDescriptor_WithNullDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        test.throws(function () {
            obj.addVotingDescriptor({level: 1, votingDescriptorId: null});
        });
        test.done();
    },
    addVotingDescriptor_WithInvalidDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", votingCombinationId: "1"});
        test.throws(function () {
            obj.addVotingDescriptor({level: "1", votingDescriptorId: "1"});
        });
        test.done();
    }

};