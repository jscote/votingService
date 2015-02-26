/**
 * Created by jean-sebastiencote on 12/6/14.
 */


(function (RuleSet) {

    module.exports = new RuleSet({
        ruleSetName: 'IsVoteExisting',
        haltOnException: false,
        rules: {
            "IsVoteExistingCondition": {}
        }
    });


})(require('jsai-ruleengine').RuleSet);
