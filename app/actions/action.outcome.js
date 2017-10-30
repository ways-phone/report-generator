import Dbs from '../dbs';

export const ADD_OUTCOME_SUCCESS = 'ADD_OUTCOME_SUCCESS';
export const ADD_OUTCOME_FAILURE = 'ADD_OUTCOME_FAILURE';
export const FETCH_OUTCOMES_SUCCESS = 'FETCH_OUTCOMES_SUCCESS';
export const FETCH_OUTCOMES_FAILURE = 'FETCH_OUTCOMES_FAILURE';

export const ADD_OUTCOME_GROUP_SUCCESS = 'ADD_OUTCOME_GROUP_SUCCESS';
export const ADD_OUTCOME_GROUP_FAILURE = 'ADD_OUTCOME_GROUP_FAILURE';
export const FETCH_OUTCOME_GROUPS_SUCCESS = 'FETCH_OUTCOME_GROUPS_SUCCESS';
export const FETCH_OUTCOME_GROUPS_FAILURE = 'FETCH_OUTCOME_GROUPS_FAILURE';

export const ADD_GROUP_TO_OUTCOME_SUCCESS = 'ADD_GROUP_TO_OUTCOME_SUCCESS';
export const ADD_GROUP_TO_OUTCOME_FAILURE = 'ADD_GROUP_TO_OUTCOME_FAILURE';

export const REMOVE_OUTCOME_SUCCESS = 'REMOVE_OUTCOME_SUCCESS';
export const REMOVE_OUTCOME_FAILURE = 'REMOVE_OUTCOME_FAILURE';

export const REMOVE_OUTCOME_GROUP_SUCCESS = 'REMOVE_OUTCOME_GROUP_SUCCESS';
export const REMOVE_OUTCOME_GROUP_FAILURE = 'REMOVE_OUTCOME_GROUP_FAILURE';

export const REMOVE_GROUP_FROM_OUTCOME_SUCCESS =
  'REMOVE_GROUP_FROM_OUTCOME_SUCCESS';
export const REMOVE_GROUP_FROM_OUTCOME_FAILURE =
  'REMOVE_GROUP_FROM_OUTCOME_FAILURE';

export const addOutcomeGroupSuccess = outcomeGroup => ({
  type: ADD_OUTCOME_GROUP_SUCCESS,
  outcomeGroup
});
export const addOutcomeGroupFailure = err => ({
  type: ADD_OUTCOME_GROUP_FAILURE,
  err
});

export const fetchOutcomeGroupsSuccess = outcomeGroups => ({
  type: FETCH_OUTCOME_GROUPS_SUCCESS,
  outcomeGroups
});
export const fetchOutcomeGroupsFailure = err => ({
  type: FETCH_OUTCOME_GROUPS_FAILURE,
  err
});

export const addOutcomeSuccess = outcome => ({
  type: ADD_OUTCOME_SUCCESS,
  outcome
});
export const addOutcomeFailure = err => ({ type: ADD_OUTCOME_FAILURE, err });
export const fetchOutcomesSuccess = outcomes => ({
  type: FETCH_OUTCOMES_SUCCESS,
  outcomes
});
export const fetchOutcomesFailure = err => ({
  type: FETCH_OUTCOMES_FAILURE,
  err
});

export const addGrouptoOutcomeSuccess = outcome => ({
  type: ADD_GROUP_TO_OUTCOME_SUCCESS,
  outcome
});
export const addGroupToOutcomeFailure = err => ({
  type: ADD_GROUP_TO_OUTCOME_FAILURE,
  err
});

export const removeGroupFromOutcomeSuccess = outcome => ({
  type: REMOVE_GROUP_FROM_OUTCOME_SUCCESS,
  outcome
});
export const removeGroupFromOutcomeFailure = err => ({
  type: REMOVE_GROUP_FROM_OUTCOME_FAILURE,
  err
});

export const removeOutcomeSuccess = outcome => ({
  type: REMOVE_OUTCOME_SUCCESS,
  outcome
});

export const removeOutcomeFailure = err => ({
  type: REMOVE_OUTCOME_FAILURE,
  err
});

export const removeOutcomeGroupSuccess = (updatedOutcomes, groupRemoved) => ({
  type: REMOVE_OUTCOME_GROUP_SUCCESS,
  updatedOutcomes,
  groupRemoved
});

export const removeOutcomeGroupFailure = err => ({
  type: REMOVE_OUTCOME_GROUP_FAILURE,
  err
});

// Async Methods

export const fetchOutcomes = () => dispatch => {
  Dbs.outcomesDB
    .find({})
    .then(outcomes => dispatch(fetchOutcomesSuccess(outcomes)))
    .catch(err => dispatch(fetchOutcomesFailure(err)));
};

export const addOutcome = outcome => dispatch => {
  Dbs.outcomesDB
    .insert(outcome.state)
    .then(updated => dispatch(addOutcomeSuccess(updated)))
    .catch(err => dispatch(addOutcomeFailure(err)));
};

export const fetchOutcomeGroups = () => dispatch => {
  Dbs.outcomeGroupDB
    .find({})
    .then(outcomeGroups => dispatch(fetchOutcomeGroupsSuccess(outcomeGroups)))
    .catch(err => dispatch(fetchOutcomeGroupsFailure(err)));
};

export const addOutcomeGroup = outcomeGroup => dispatch => {
  Dbs.outcomeGroupDB
    .insert(outcomeGroup)
    .then(inserted => dispatch(addOutcomeGroupSuccess(inserted)))
    .catch(err => dispatch(addOutcomeGroupFailure(err)));
};

export const addGroupToOutcome = (group, outcome) => dispatch => {
  const id = outcome._id;

  Dbs.outcomesDB
    .update(
      { _id: id },
      { $push: { groups: group } },
      { returnUpdatedDocs: true }
    )
    .then(update => dispatch(addGrouptoOutcomeSuccess(update[1])))
    .catch(err => dispatch(addGroupToOutcomeFailure(err)));
};

export const removeGroupFromOutcome = (group, outcome) => dispatch => {
  const id = outcome._id;

  Dbs.outcomesDB
    .update(
      { _id: id },
      { $pull: { groups: group } },
      { returnUpdatedDocs: true }
    )
    .then(update => dispatch(removeGroupFromOutcomeSuccess(update[1])))
    .catch(err => dispatch(removeGroupFromOutcomeFailure(err)));
};

export const removeOutcome = outcome => dispatch => {
  Dbs.outcomesDB
    .remove({ _id: outcome._id })
    .then(() => dispatch(removeOutcomeSuccess(outcome)))
    .catch(err => dispatch(removeOutcomeFailure(err)));
};

export const removeOutcomeGroup = group => dispatch => {
  Dbs.outcomeGroupDB
    .remove({ _id: group._id })
    .then(() => {
      return Dbs.outcomesDB.update(
        { groups: { $elemMatch: { _id: group._id } } },
        { $pull: { groups: group } },
        { returnUpdatedDocs: true, multi: true }
      );
    })
    .then(updated => dispatch(removeOutcomeGroupSuccess(updated, group)))
    .catch(err => dispatch(removeOutcomeGroupFailure(err)));
};
