/**
 * Created by jean-sebastiencote on 1/10/15.
 */
(function () {

    module.exports = {
        version: '0.1.1',
        processorName: 'voteCreation',
        nodeType: 'CompensatedNode',
        parameters: {
            compensationNode: {nodeType: 'NoOpTaskNode'},
            startNode: {
                nodeType: 'ConditionNode',
                parameters: {
                    condition: 'VoterIsValidRuleSet',
                    trueSuccessor: {
                        nodeType: 'IteratorNode',
                        parameters: {
                            iterator: 'executionContext.request.data.votes',
                            startNode: {
                                nodeType: 'ValidateVotingItems',
                                parameters: {
                                    successor: {
                                        nodeType: 'ConditionNode',
                                        parameters: {
                                            condition: 'IsVotingItemValid',
                                            trueSuccessor: {
                                                nodeType: 'ConditionNode',
                                                parameters: {
                                                    condition: 'IsVoteExisting',
                                                    trueSuccessor: {
                                                        nodeType: 'PersistRejectedVote',
                                                        parameters: {
                                                            successor: {
                                                                nodeType: 'RaiseRejectedVote'
                                                            }
                                                        }
                                                    },
                                                    falseSuccessor: {
                                                        nodeType: 'ConditionNode',
                                                        parameters: {
                                                            condition: 'IsVoteDeletedAfterCurrentVote',
                                                            trueSuccessor: {
                                                                nodeType: 'NoOpTaskNode'
                                                            },
                                                            falseSuccessor: {
                                                                nodeType: 'PersistAddedVote',
                                                                parameters: {
                                                                    successor: {
                                                                        nodeType: 'RaiseAddedVote'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            falseSuccessor: {
                                                nodeType: 'AddVoteToWaitingList'
                                            }

                                        }


                                    }
                                }
                            }
                        }
                    },
                    falseSuccessor: {
                        nodeType: 'AddVoteToWaitingList'
                    }
                }
            }
        }
    };


})();