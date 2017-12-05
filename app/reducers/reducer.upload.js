import _ from 'underscore';
import * as types from '../actions/action.upload';

const allFilesUploaded = state =>
  !!(state.agents.complete && state.campaigns.complete);

const allAgentFilesUploaded = state =>
  state.agents.cph && state.agents.outcomes;

const allCampaignFilesUploaded = state =>
  state.campaigns.cph && state.campaigns.outcomes;

const addFile = (state: {}, file: {}, type: string) => {
  // select either the campaigns or agents property from state
  let obj = state[type];

  if (!file.isCPH) {
    // if the outcomes file has already been uploaded set the error message
    if (obj.outcomes)
      return handleError(state, `${type} Outcomes File Already Uploaded`);

    // store the parsed file in the outcomes property
    obj = { ...obj, outcomes: file };
  } else {
    // if the cph file has already been uploaded set the error message
    if (obj.cph) return handleError(state, `${type} CPH File Already Uploaded`);
    // store the parsed file in the cph property
    obj = { ...obj, cph: file };
  }

  const newState = { ...state };
  // overwrite the existing campaigns / agents property with new data
  newState[type] = obj;

  if (!state.files) {
    newState['files'] = [file.name];
  } else {
    newState.files.push(file.name);
  }

  return newState;
};

const mergeFiles = (cph: {}, outcomes: {}) => {
  const all = [];
  outcomes.data.forEach(row => {
    let merged = {};
    const name = row.name;

    // find the corresponding row from the cph file
    const cphRow = _.find(cph.data, t => t.name === name);

    if (!cphRow || !cphRow.hours) return;

    // add the hours to the outcomes row
    merged = { ...row, hours: cphRow.hours };
    all.push(merged);
  });
  return all;
};

const addAgentFile = (state, file) => {
  // add the parsed file to the cph or outcomes property
  const newState = addFile(state, file, 'agents');

  // if both the cph and outcomes properties exist then all agent files are uploaded
  if (!allAgentFilesUploaded(newState)) return newState;

  // merge the cph and outcomes files together
  const data = mergeFiles(newState.agents.cph, newState.agents.outcomes);

  // overwrite the agents property with the merged data
  newState.agents = { name: 'agents', data, complete: true };

  newState.uploadComplete = allFilesUploaded(newState);

  return newState;
};

const addCampaignFile = (state, file) => {
  // add the parsed file to the cph or outcomes property
  const newState = addFile(state, file, 'campaigns');

  // if both the cph and outcomes properties exist then all campaign files are uploaded
  if (!allCampaignFilesUploaded(newState)) return newState;

  // merge the cph and outcomes files together
  const data = mergeFiles(newState.campaigns.cph, newState.campaigns.outcomes);

  // overwrite the campaigns property with the merged data
  newState.campaigns = { name: 'campaigns', data, complete: true };

  newState.uploadComplete = allFilesUploaded(newState);

  return newState;
};

const removeUploadedFiles = state => {
  return {
    agents: {},
    campaigns: {},
    uploadComplete: false,
    files: []
  };
};

const handleError = (state, err) => ({ ...state, err });

export default function upload(
  state: {} = { agents: {}, campaigns: {}, uploadComplete: false, files: [] },
  action: actionType
) {
  switch (action.type) {
    case types.ADD_AGENT_FILE:
      return addAgentFile(state, action.file);
    case types.ADD_CAMPAIGN_FILE:
      return addCampaignFile(state, action.file);
    case types.REMOVE_UPLOADED_FILES:
      return removeUploadedFiles(state);
    case types.READ_FILE_ERROR:
      return handleError(state, action.err);
    default:
      return state;
  }
}
