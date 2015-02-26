
(function(_, q,Rule, RuleCondition) {


    var fCondition = function(evalContext) {
        var dfd = q.defer();

        process.nextTick(function(){
            console.log("Voting Item Does Exist!");
            dfd.resolve({isTrue : true});
        });

        return dfd.promise;
    };

    module.exports = new Rule({
        ruleName: 'IsVotingItemValidCondition',
        condition: new RuleCondition(fCondition)

    });


})(
    require('lodash'),
    require('q'),
    require('jsai-ruleengine/Rule').Rule,
    require('jsai-ruleengine/Rule').RuleCondition);
