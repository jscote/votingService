/**
 * Created by jean-sebastiencote on 12/6/14.
 */


(function (RuleSet) {

    module.exports = new RuleSet({
        ruleSetName: 'IsVoteDeletedAfterCurrentVote',
        haltOnException: false,
        haltOnFirstFalseRule: true,
        rules: {
            "IsVoteDeletedCondition": {},
            "IsDeletedVoteAfterCurrentCondition" : {}
        }
    });


})(require('jsai-ruleengine').RuleSet);
