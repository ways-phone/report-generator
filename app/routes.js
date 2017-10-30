/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import UploadPage from './containers/UploadPage';
import KpiPage from './containers/KpiPage';
import OutcomesPage from './containers/OutcomesPage';
import CreateReportPage from './containers/CreateReportPage';
import GenerateReportPage from './containers/GenerateReportPage';

export default () => (
  <App>
    <Switch>
      <Route path="/outcomes" component={OutcomesPage} />
      <Route path="/create-report" component={CreateReportPage} />
      <Route path="/generate-report" component={GenerateReportPage} />
      <Route path="/kpi" component={KpiPage} />
      <Route path="/" component={UploadPage} />
    </Switch>
  </App>
);
