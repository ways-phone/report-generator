import * as types from '../actions/action.outcome';

const fetchOutcomes = (state, outcomes) => ({
  ...state,
  outcomes,
});

const addOutcomeSuccess = (state, outcome) => {
  const outcomes = state.outcomes.map(o => o);
  outcomes.push(outcome);
  return { ...state, outcomes };
};

const fetchOutcomeGroups = (state, groups) => ({
  ...state,
  groups,
});

const addOutcomeGroupSuccess = (state, outcomeGroup) => {
  const groups = state.groups.map(g => g);
  groups.push(outcomeGroup);
  return {
    ...state,
    groups,
  };
};

const addGroupToOutcomeSuccess = (state, outcome) => {
  console.log('outcome:', outcome);
  const updated = state.outcomes.map(item => {
    if (item._id === outcome._id) return outcome;
    return item;
  });
  return { ...state, outcomes: updated };
};

const removeGroupFromOutcomeSuccess = (state, outcome) => {
  const updated = state.outcomes.map(item => {
    if (item._id === outcome._id) return outcome;
    return item;
  });
  return { ...state, outcomes: updated };
};

const handleError = (state, err) => ({
  ...state,
  err,
});

export default function outcomes(state = {}, action) {
  switch (action.type) {
    case types.ADD_OUTCOME_SUCCESS:
      return addOutcomeSuccess(state, action.outcome);
    case types.ADD_OUTCOME_FAILURE:
      return handleError(state, action.err);
    case types.FETCH_OUTCOMES_SUCCESS:
      return fetchOutcomes(state, action.outcomes);
    case types.FETCH_OUTCOMES_FAILURE:
      return handleError(state, action.err);
    case types.FETCH_OUTCOME_GROUPS_SUCCESS:
      return fetchOutcomeGroups(state, action.outcomeGroups);
    case types.FETCH_OUTCOME_GROUPS_FAILURE:
      return handleError(state, action.err);
    case types.ADD_OUTCOME_GROUP_SUCCESS:
      return addOutcomeGroupSuccess(state, action.outcomeGroup);
    case types.ADD_OUTCOME_GROUP_FAILURE:
      return handleError(state, action.err);
    case types.ADD_GROUP_TO_OUTCOME_SUCCESS:
      return addGroupToOutcomeSuccess(state, action.outcome);
    case types.REMOVE_GROUP_FROM_OUTCOME_SUCCESS:
      return removeGroupFromOutcomeSuccess(state, action.outcome);
    case types.ADD_GROUP_TO_OUTCOME_FAILURE:
      return handleError(state, action.err);
    case types.REMOVE_GROUP_FROM_OUTCOME_FAILURE:
      return handleError(state, action.err);
    default:
      return state;
  }
}
