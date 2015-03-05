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
        var obj = p.create();

        test.ok(obj, "Domain Object should be created");
        test.ok(obj.state == 1, "State should be set to 1 for inserted");
        test.done();
    }

};