import Dbs from '../dbs';

import ReportGenerator from '../utils/ReportGenerator';

export const FETCH_REPORT_TYPES_SUCCESS = 'FETCH_REPORT_TYPES_SUCCESS';
export const FETCH_REPORT_TYPES_FAILURE = 'FETCH_REPORT_TYPES_FAILURE';

export const FETCH_CAMPAIGN_KPIS_SUCCESS = 'FETCH_CAMPAIGN_KPIS_SUCCESS';
export const FETCH_CAMPAIGN_KPIS_FAILURE = 'FETCH_CAMPAIGN_KPIS_FAILURE';

export const FETCH_OUTCOMES_SUCCESS = 'FETCH_OUTCOMES_SUCCESS';
export const FETCH_OUTCOMES_FAILURE = 'FETCH_OUTCOMES_FAILURE';

export const FETCH_OUTCOME_GROUPS_SUCCESS = 'FETCH_OUTCOME_GROUPS_SUCCESS';
export const FETCH_OUTCOME_GROUPS_FAILURE = 'FETCH_OUTCOME_GROUPS_FAILURE';

export const GENERATE_REPORT_SUCCESS = 'GENERATE_REPORT_SUCCESS';
export const GENERATE_REPORT_FAILURE = 'GENERATE_REPORT_FAILURE';

export const CLEAR_REPORT = 'CLEAR_REPORT';

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

const fetchReportTypesSuccess = reports => ({
  type: FETCH_REPORT_TYPES_SUCCESS,
  reports,
});

const fetchReportTypesFailure = err => ({
  type: FETCH_REPORT_TYPES_FAILURE,
  err,
});

const generateReportSuccess = report => ({
  type: GENERATE_REPORT_SUCCESS,
  report,
});

const generateReportFailure = err => ({
  type: GENERATE_REPORT_FAILURE,
  err,
});

export const clearReport = () => ({
  type: CLEAR_REPORT,
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

export const fetchReportTypes = () => dispatch => {
  Dbs.reportTypesDB
    .find({})
    .then(reports => dispatch(fetchReportTypesSuccess(reports)))
    .catch(err => dispatch(fetchReportTypesFailure(err)));
};

export const generateReport = config => dispatch => {
  const generator = new ReportGenerator(config);
  generator
    .generate()
    .then(report => dispatch(generateReportSuccess(report)))
    .catch(err => dispatch(generateReportFailure(err)));
};
