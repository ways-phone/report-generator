import getDb from '../database';

const CAMPAIGN_KPIS = 'campaign-kpis';
const OUTCOMES = 'outcomes';
const OUTCOME_GROUPS = 'outcome-group';
const REPORT_TYPES = 'report-types';

class Dbs {
  campaignKpiDB = getDb(CAMPAIGN_KPIS);
  outcomesDB = getDb(OUTCOMES);
  outcomeGroupDB = getDb(OUTCOME_GROUPS);
  reportTypesDB = getDb(REPORT_TYPES);
}

export default new Dbs();
