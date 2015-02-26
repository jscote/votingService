/**
 * Created by jean-sebastiencote on 12/6/14.
 */


(function (RuleSet) {

    module.exports = new RuleSet({
        ruleSetName: 'IsVotingItemValid',
        haltOnException: false,
        rules: {
            "IsVotingItemValidCondition": {}
        }
    });


})(require('jsai-ruleengine').RuleSet);
