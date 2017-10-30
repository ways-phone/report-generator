import * as types from "../actions/action.kpi";

const addCampaignKpiSuccess = (state, kpi) => {
  const kpis = state.kpis.map(o => o);
  kpis.push(kpi);
  return { ...state, kpis, err: {}, success: "Campaign added successfully." };
};

const fetchCampaignsKpisSuccess = (state, kpis) => ({
  ...state,
  kpis,
  err: {},
  success: ""
});

const updateCampaignKPISuccess = (state, kpi) => {
  const updated = state.kpis.map(current => {
    if (current._id === kpi._id) return kpi;
    return current;
  });

  return {
    ...state,
    kpis: updated,
    err: {},
    success: "Campaign updated successfully."
  };
};

const deleteCampaignKPISuccess = (state, kpi) => {
  const updated = state.kpis
    .map(current => {
      if (current._id === kpi._id) return;
      return current;
    })
    .filter(t => t);

  return {
    ...state,
    kpis: updated,
    err: {},
    success: "Campaign deleted successfully."
  };
};

const handleError = (state, err) => ({
  ...state,
  err,
  success: ""
});

export default function kpis(
  state = { kpis: [], err: {}, success: "" },
  action
) {
  switch (action.type) {
    case types.ADD_CAMPAIGN_KPI_SUCCESS:
      return addCampaignKpiSuccess(state, action.kpi);
    case types.ADD_CAMPAIGN_KPI_FAILURE:
      return handleError(state, action.err);
    case types.FETCH_CAMPAIGN_KPIS_SUCCESS:
      return fetchCampaignsKpisSuccess(state, action.kpis);
    case types.FETCH_CAMPAIGN_KPIS_FAILURE:
      return handleError(state, action.err);
    case types.UPDATE_CAMPAIGN_SUCCESS:
      return updateCampaignKPISuccess(state, action.kpi);
    case types.UPDATE_CAMPAIGN_FAILURE:
      return handleError(state, action.err);
    case types.DELETE_CAMPAIGN_SUCCESS:
      return deleteCampaignKPISuccess(state, action.kpi);
    case types.DELETE_CAMPAIGN_FAILURE:
      return handleError(state, action.err);
    default:
      return state;
  }
}
