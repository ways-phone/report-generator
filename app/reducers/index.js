// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import upload from './reducer.upload';
import outcomes from './reducer.outcome';
import kpi from './reducer.kpi';
import createReport from './reducer.create-report';
import generateReport from './reducer.generate-report';

const rootReducer = combineReducers({
  upload,
  router,
  outcomes,
  kpi,
  createReport,
  generateReport,
});

export default rootReducer;
