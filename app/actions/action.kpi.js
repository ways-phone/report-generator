import Dbs from '../dbs';

export const ADD_CAMPAIGN_KPI_SUCCESS = 'ADD_CAMPAIGN_KPI_SUCCESS';
export const ADD_CAMPAIGN_KPI_FAILURE = 'ADD_CAMPAIGN_KPI_FAILURE';

export const FETCH_CAMPAIGN_KPIS_SUCCESS = 'FETCH_CAMPAIGN_KPIS_SUCCESS';
export const FETCH_CAMPAIGN_KPIS_FAILURE = 'FETCH_CAMPAIGN_KPIS_FAILURE';

export const UPDATE_CAMPAIGN_SUCCESS = 'UPDATE_CAMPAIGN_SUCCESS';
export const UPDATE_CAMPAIGN_FAILURE = 'UPDATE_CAMPAIGN_FAILURE';

export const DELETE_CAMPAIGN_FAILURE = 'DELETE_CAMPAIGN_FAILURE';
export const DELETE_CAMPAIGN_SUCCESS = 'DELETE_CAMPAIGN_SUCCESS';

export const addCampaignKpiSuccess = kpi => ({
  type: ADD_CAMPAIGN_KPI_SUCCESS,
  kpi
});
export const addCampaignKpiFailure = err => ({
  type: ADD_CAMPAIGN_KPI_FAILURE,
  err
});

export const fetchCampaignKpisSuccess = kpis => ({
  type: FETCH_CAMPAIGN_KPIS_SUCCESS,
  kpis
});

export const fetchCampaignKpisFailure = err => ({
  type: FETCH_CAMPAIGN_KPIS_FAILURE,
  err
});

export const updateCampaignSuccess = kpi => ({
  type: UPDATE_CAMPAIGN_SUCCESS,
  kpi
});

export const updateCampaignFailure = err => ({
  type: UPDATE_CAMPAIGN_FAILURE,
  err
});

export const deleteCampaignSuccess = kpi => ({
  type: DELETE_CAMPAIGN_SUCCESS,
  kpi
});

export const deleteCampaignFailure = err => ({
  type: DELETE_CAMPAIGN_FAILURE,
  err
});

export const addCampaignKPI = campaign => dispatch => {
  console.log(campaign);

  Dbs.campaignKpiDB
    .insert(campaign)
    .then(updated => dispatch(addCampaignKpiSuccess(updated)))
    .catch(err => dispatch(addCampaignKpiFailure(err)));
};

export const fetchCampaignKpis = () => dispatch => {
  Dbs.campaignKpiDB
    .find({})
    .then(kpis => dispatch(fetchCampaignKpisSuccess(kpis)))
    .catch(err => dispatch(fetchCampaignKpisFailure(err)));
};

export const updateCampaignKPI = campaign => dispatch => {
  Dbs.campaignKpiDB
    .update(
      { _id: campaign._id },
      {
        $set: {
          name: campaign.name,
          conversion: campaign.conversion,
          contact: campaign.contact
        }
      },
      { returnUpdatedDocs: true }
    )
    .then(update => dispatch(updateCampaignSuccess(update[1])))
    .catch(err => dispatch(updateCampaignFailure(err)));
};

export const deleteCampaignKPI = campaign => dispatch => {
  Dbs.campaignKpiDB
    .remove({ _id: campaign._id })
    .then(() => dispatch(deleteCampaignSuccess(campaign)))
    .catch(err => dispatch(deleteCampaignFailure(err)));
};
