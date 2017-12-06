import CampaignParser from '../utils/CampaignParser';
import AgentParser from '../utils/AgentParser';

export const ADD_AGENT_FILE = 'ADD_AGENT_FILE';
export const ADD_CAMPAIGN_FILE = 'ADD_CAMPAIGN_FILE';
export const READ_FILE_ERROR = 'READ_FILE_ERROR';

export const REMOVE_UPLOADED_FILES = 'REMOVE_UPLOADED_FILES';

export const addAgentFile = file => ({ type: ADD_AGENT_FILE, file });
export const addCampaignFile = file => ({ type: ADD_CAMPAIGN_FILE, file });
export const readFileError = err => ({ type: READ_FILE_ERROR, err });
export const removeUploadedFiles = () => ({ type: REMOVE_UPLOADED_FILES });

export const readFile = path => dispatch => {
  if (!path.match(/\.csv$/)) {
    return dispatch(
      readFileError(
        new Error('Incompatible File Type. File must be of type csv')
      )
    );
  }
  let parser;
  const isAgent = !path.match(/.*campaigns.*/);

  if (isAgent) parser = new AgentParser(path);
  else parser = new CampaignParser(path);

  const data = parser.parse();

  const config = {
    name: parser.name,
    path: parser.path,
    data,
    isCPH: parser.isCPHFile()
  };

  if (isAgent) return dispatch(addAgentFile(config));
  return dispatch(addCampaignFile(config));
};
