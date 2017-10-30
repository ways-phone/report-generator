import * as types from '../actions/action.create-report';

const fetchCampaignsKpisSuccess = (state, kpis) => ({
  ...state,
  kpis,
  err: {},
  success: '',
});

const fetchOutcomes = (state, outcomes) => ({
  ...state,
  outcomes,
});

const fetchOutcomeGroups = (state, groups) => ({
  ...state,
  groups,
});

const saveReportType = (state, reportType) => {
  const reports = state.reports.map(t => t);
  reports.push(reportType);
  return {
    ...state,
    reports,
    success: 'Report created successfully',
  };
};

const fetchReportTypes = (state, reports) => ({
  ...state,
  reports,
});

const updateReportType = (state, reportType) => {
  console.log('reducer: ', reportType);
  const updated = state.reports.map(current => {
    if (current._id === reportType._id) return reportType;
    return current;
  });
  return {
    ...state,
    reports: updated,
    err: {},
    success: 'Report updated Successfully',
  };
};

const deleteReportType = (state, reportType) => {
  const updated = state.reports
    .map(current => {
      if (current._id === reportType._id) return;
      return current;
    })
    .filter(t => t);

  return {
    ...state,
    reports: updated,
    err: {},
    success: 'Report Deleted Successfully',
  };
};

const handleError = (state, err) => ({
  ...state,
  err,
  success: '',
});

export default function createReport(
  state = { kpis: [], err: {}, success: '', reports: [] },
  action
) {
  switch (action.type) {
    case types.FETCH_CAMPAIGN_KPIS_SUCCESS:
      return fetchCampaignsKpisSuccess(state, action.kpis);
    case types.FETCH_OUTCOMES_SUCCESS:
      return fetchOutcomes(state, action.outcomes);
    case types.FETCH_OUTCOME_GROUPS_SUCCESS:
      return fetchOutcomeGroups(state, action.outcomeGroups);
    case types.SAVE_REPORT_TYPE_SUCCESS:
      return saveReportType(state, action.reportType);
    case types.FETCH_REPORT_TYPES_SUCCESS:
      return fetchReportTypes(state, action.reports);
    case types.UPDATE_REPORT_TYPE_SUCCESS:
      return updateReportType(state, action.reportType);
    case types.DELETE_REPORT_TYPE_SUCCESS:
      return deleteReportType(state, action.reportType);
    case types.FETCH_OUTCOMES_FAILURE:
    case types.FETCH_OUTCOME_GROUPS_FAILURE:
    case types.SAVE_REPORT_TYPE_FAILURE:
    case types.FETCH_CAMPAIGN_KPIS_FAILURE:
    case types.FETCH_REPORT_TYPES_FAILURE:
    case types.UDPATE_REPORT_TYPE_FAILURE:
    case types.DELETE_REPORT_TYPE_FAILURE:
      return handleError(state, action.err);
    default:
      return state;
  }
}
