import Dbs from '../dbs';

export const FETCH_CAMPAIGN_KPIS_SUCCESS = 'FETCH_CAMPAIGN_KPIS_SUCCESS';
export const FETCH_CAMPAIGN_KPIS_FAILURE = 'FETCH_CAMPAIGN_KPIS_FAILURE';

export const FETCH_OUTCOMES_SUCCESS = 'FETCH_OUTCOMES_SUCCESS';
export const FETCH_OUTCOMES_FAILURE = 'FETCH_OUTCOMES_FAILURE';

export const FETCH_OUTCOME_GROUPS_SUCCESS = 'FETCH_OUTCOME_GROUPS_SUCCESS';
export const FETCH_OUTCOME_GROUPS_FAILURE = 'FETCH_OUTCOME_GROUPS_FAILURE';

export const SAVE_REPORT_TYPE_SUCCESS = 'SAVE_REPORT_TYPE_SUCCESS';
export const SAVE_REPORT_TYPE_FAILURE = 'SAVE_REPORT_TYPE_FAILURE';

export const FETCH_REPORT_TYPES_SUCCESS = 'FETCH_REPORT_TYPES_SUCCESS';
export const FETCH_REPORT_TYPES_FAILURE = 'FETCH_REPORT_TYPES_FAILURE';

export const UPDATE_REPORT_TYPE_SUCCESS = 'UPDATE_REPORT_TYPE_SUCCESS';
export const UDPATE_REPORT_TYPE_FAILURE = 'UDPATE_REPORT_TYPE_FAILURE';

export const DELETE_REPORT_TYPE_SUCCESS = 'DELETE_REPORT_TYPE_SUCCESS';
export const DELETE_REPORT_TYPE_FAILURE = 'DELETE_REPORT_TYPE_FAILURE';

const fetchCampaignKpisSuccess = kpis => ({
  type: FETCH_CAMPAIGN_KPIS_SUCCESS,
  kpis,
});

const fetchCampaignKpisFailure = err => ({
  type: FETCH_CAMPAIGN_KPIS_FAILURE,
  err,
});

const fetchOutcomesSuccess = outcomes => ({
  type: FETCH_OUTCOMES_SUCCESS,
  outcomes,
});

const fetchOutcomesFailure = err => ({
  type: FETCH_OUTCOMES_FAILURE,
  err,
});

const fetchOutcomeGroupsSuccess = outcomeGroups => ({
  type: FETCH_OUTCOME_GROUPS_SUCCESS,
  outcomeGroups,
});
const fetchOutcomeGroupsFailure = err => ({
  type: FETCH_OUTCOME_GROUPS_FAILURE,
  err,
});

const saveReportTypeSuccess = reportType => ({
  type: SAVE_REPORT_TYPE_SUCCESS,
  reportType,
});

const saveReportTypeFailure = err => ({
  type: SAVE_REPORT_TYPE_FAILURE,
  err,
});

const fetchReportTypesSuccess = reports => ({
  type: FETCH_REPORT_TYPES_SUCCESS,
  reports,
});

const fetchReportTypesFailure = err => ({
  type: FETCH_REPORT_TYPES_FAILURE,
  err,
});

const updateReportTypeSuccess = reportType => ({
  type: UPDATE_REPORT_TYPE_SUCCESS,
  reportType,
});

const updateReportTypeFailure = err => ({
  type: UDPATE_REPORT_TYPE_FAILURE,
  err,
});

const deleteReportTypeSuccess = reportType => ({
  type: DELETE_REPORT_TYPE_SUCCESS,
  reportType,
});

const deleteReportTypeFailure = err => ({
  type: DELETE_REPORT_TYPE_FAILURE,
  err,
});

// async

export const fetchCampaignKpis = () => dispatch => {
  Dbs.campaignKpiDB
    .find({})
    .then(kpis => dispatch(fetchCampaignKpisSuccess(kpis)))
    .catch(err => dispatch(fetchCampaignKpisFailure(err)));
};

export const fetchOutcomes = () => dispatch => {
  Dbs.outcomesDB
    .find({})
    .then(outcomes => dispatch(fetchOutcomesSuccess(outcomes)))
    .catch(err => dispatch(fetchOutcomesFailure(err)));
};

export const fetchOutcomeGroups = () => dispatch => {
  Dbs.outcomeGroupDB
    .find({})
    .then(outcomeGroups => dispatch(fetchOutcomeGroupsSuccess(outcomeGroups)))
    .catch(err => dispatch(fetchOutcomeGroupsFailure(err)));
};

export const saveReportType = reportType => dispatch => {
  Dbs.reportTypesDB
    .insert(reportType)
    .then(updated => dispatch(saveReportTypeSuccess(updated)))
    .catch(err => dispatch(saveReportTypeFailure(err)));
};

export const fetchReportTypes = () => dispatch => {
  Dbs.reportTypesDB
    .find({})
    .then(reports => dispatch(fetchReportTypesSuccess(reports)))
    .catch(err => dispatch(fetchReportTypesFailure(err)));
};

export const updateReportType = reportType => dispatch => {
  Dbs.reportTypesDB
    .update(
      { _id: reportType._id },
      {
        $set: {
          name: reportType.name,
          columns: reportType.columns,
        },
      },
      { returnUpdatedDocs: true }
    )
    .then(updated => dispatch(updateReportTypeSuccess(updated[1])))
    .catch(err => dispatch(updateReportTypeFailure(err)));
};

export const deleteReportType = reportType => dispatch => {
  Dbs.reportTypesDB
    .remove({ _id: reportType._id })
    .then(() => dispatch(deleteReportTypeSuccess(reportType)))
    .catch(err => dispatch(deleteReportType(err)));
};
