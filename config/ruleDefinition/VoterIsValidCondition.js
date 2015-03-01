
(function(_, q,Rule, RuleCondition) {


    var fCondition = function(evalContext) {
        var dfd = q.defer();

        var provider = Injector.resolve({target: 'voterProvider'});
        var id = evalContext.fact.request.data.voterId;

        provider.getVoterById(id).then(function(result){
            if(result === null) {
                dfd.resolve({isTrue : false});
            } else {
                dfd.resolve({isTrue : true});
            }
        }).fail(function(error) {
            dfd.resolve({isTrue : false});
        });

        return dfd.promise;
    };

    module.exports = new Rule({
        ruleName: 'VoterIsValidCondition',
        condition: new RuleCondition(fCondition)

    });


})(
    require('lodash'),
    require('q'),
    require('jsai-ruleengine/Rule').Rule,
    require('jsai-ruleengine/Rule').RuleCondition);
