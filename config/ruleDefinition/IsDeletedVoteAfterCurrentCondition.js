
(function(_, q,Rule, RuleCondition) {


    var fCondition = function(evalContext) {
        var dfd = q.defer();

        process.nextTick(function(){
            console.log("Vote is not after");
            dfd.resolve({isTrue : false});
        });

        return dfd.promise;
    };

    module.exports = new Rule({
        ruleName: 'IsDeletedVoteAfterCurrentCondition',
        condition: new RuleCondition(fCondition)

    });


})(
    require('lodash'),
    require('q'),
    require('jsai-ruleengine/Rule').Rule,
    require('jsai-ruleengine/Rule').RuleCondition);
