import * as types from '../actions/action.generate-report';

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

const fetchReportTypes = (state, reports) => ({
  ...state,
  reports,
});

const generateReportSuccess = (state, report) => ({
  ...state,
  finalReport: report,
});

const clearReport = state => ({
  ...state,
  finalReport: '',
});

const handleError = (state, err) => ({
  ...state,
  err,
  success: '',
});

export default function generateReport(
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
    case types.FETCH_REPORT_TYPES_SUCCESS:
      return fetchReportTypes(state, action.reports);
    case types.GENERATE_REPORT_SUCCESS:
      return generateReportSuccess(state, action.report);
    case types.CLEAR_REPORT:
      return clearReport(state);
    case types.FETCH_OUTCOMES_FAILURE:
    case types.FETCH_OUTCOME_GROUPS_FAILURE:
    case types.FETCH_CAMPAIGN_KPIS_FAILURE:
    case types.FETCH_REPORT_TYPES_FAILURE:
    case types.GENERATE_REPORT_FAILURE:
      return handleError(state, action.err);
    default:
      return state;
  }
}
