/**
 * Created by jscote on 3/8/14.
 */

//Configure environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Get configuration file based on environment
var config = require('../../config/config')[env];

global.Injector = require('jsai-injector');
global.Injector.setBasePath(config.rootPath);

var domainObject = require('../../domainObjects/votingHierarchy');
var provider = require('../../domainObjects/providers/votingHierarchyProvider');


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
        var obj = p.create({votingHierarchyId: "1", description: "toto"});

        test.ok(obj, "Domain Object should be created");
        test.ok(obj.state == 1, "State should be set to 1 for inserted");
        test.done();
    },
    create_whenInvalidId_willThrow: function (test) {

        var p = new provider();
        test.throws(function () {
            var obj = p.create({description: "toto"})
        });


        test.done();
    },
    create_whenInvalidDescription_willThrow: function (test) {

        var p = new provider();
        test.throws(function () {
            var obj = p.create({votingHierarchyId: "toto"})
        });


        test.done();
    },
    create_whenFromProviderWithParameters_setsProperties: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});

        test.ok(obj, "Domain Object should be created");
        test.ok(obj.state == 1, "State should be set to 1 for inserted");
        test.ok(obj.votingHierarchyId == "1", "Id should be 1");
        test.ok(obj.description == "description", "description should be set correctly");
        test.done();
    },
    create_whenFromProviderWithInvalidParameters_willFail: function (test) {
        var p = new provider();
        test.throws(function () {
            var obj = p.create({votingHierarchyId: 1, description: "description"})
        });
        test.done();
    },
    addLevel_withParentLevel_IsAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        test.ok(obj.getLevels({level: 2, parentLevel: 1}).length == 1, "Should have one level");
        test.done();

    },
    addLevel_withSameLevelTwice_isAddedOnlyOnce: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        test.ok(obj.getLevels({level: 1, descriptor: "evt"}).length == 1, "Should have one level");
        test.done();
    },
    addLevel_withDifferentLevels_isAddedAppropriately: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "tim", isVotable: true, acceptsEligibleVoters: false});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "loc", isVotable: true, acceptsEligibleVoters: false});
        test.ok(obj.getLevels({level: 2}).length == 2, "Should have two level");
        test.done();
    },
    getLevels_withoutParameters_returnsAll: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "tim", isVotable: true, acceptsEligibleVoters: false});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "loc", isVotable: true, acceptsEligibleVoters: false});
        test.ok(obj.getLevels().length == 3, "Should have three level");
        test.done();
    },
    getLevels_votableLevels_returnsProperly: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "tim", isVotable: true, acceptsEligibleVoters: false});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "loc", isVotable: true, acceptsEligibleVoters: false});
        test.ok(obj.getLevels({isVotable: true}).length == 2, "Should have two level");
        test.done();
    },
    getLevels_acceptsEligibleVotersLevels_returnsProperly: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptEligibleVoters: true});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "tim", isVotable: true, acceptEligibleVoters: false});
        obj.addLevel({level: 2, parentLevel: 1, descriptor: "loc", isVotable: true, acceptEligibleVoters: false});
        test.ok(obj.getLevels({acceptEligibleVoters: true}).length == 1, "Should have one level");
        test.done();
    },
    addLevel_withProperValues_IsAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptsEligibleVoters: true});
        test.ok(obj.getLevels({level: 1}).length == 1, "Should have one level");
        test.done();
    },
    addLevel_WithInvalidLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({
                level: "1",
                parentLevel: null,
                descriptor: "evt",
                isVotable: false,
                acceptsEligibleVoters: true
            });
        });
        test.done();
    },
    addLevel_WithInvalidParentLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({
                level: 1,
                parentLevel: "1",
                descriptor: "evt",
                isVotable: false,
                acceptsEligibleVoters: true
            });
        });
        test.done();
    },
    addLevel_WithUndefinedDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({level: 1, parentLevel: null, isVotable: false, acceptsEligibleVoters: true});
        });
        test.done();
    },
    addLevel_WithEmptyDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({level: 1, parentLevel: null, descriptor: '', isVotable: false, acceptsEligibleVoters: true});
        });
        test.done();
    },
    addLevel_WithNullDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({
                level: 1,
                parentLevel: null,
                descriptor: null,
                isVotable: false,
                acceptsEligibleVoters: true
            });
        });
        test.done();
    },
    addLevel_WithInvalidDescriptorLevel_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({level: 2, parentLevel: 1, descriptor: false, isVotable: false, acceptEligibleVoters: true});
        });
        test.done();
    },
    addLevel_WithInvalidIsVotableFlag_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: "s", acceptEligibleVoters: true});
        });
        test.done();
    },
    addLevel_WithInvalidAcceptsEligibleVotersFlag_IsNotAdded: function (test) {
        var p = new provider();
        var obj = p.create({votingHierarchyId: "1", description: "description"});
        test.throws(function () {
            obj.addLevel({level: 1, parentLevel: null, descriptor: "evt", isVotable: false, acceptEligibleVoters: "s"});
        });
        test.done();
    }//,
    //getLevels_With

};