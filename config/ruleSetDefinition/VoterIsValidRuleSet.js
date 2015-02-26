/**
 * Created by jean-sebastiencote on 12/6/14.
 */


(function (RuleSet) {

    module.exports = new RuleSet({
        ruleSetName: 'VoterIsValid',
        haltOnException: false,
        rules: {
            "VoterIsValidCondition": {}
        }
    });


})(require('jsai-ruleengine').RuleSet);
