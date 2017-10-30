import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/action.outcome';

import Sidebar from '../components/sidebar';
import OutcomesTable from '../components/outcomes-table';
import CreateOutcome from '../components/create-outcome';
import CreateOutcomeGroup from '../components/create-outcome-group';

class OutcomesPage extends Component {
  props: {
    addOutcome: () => void,
    fetchOutcomes: () => void,
    fetchOutcomeGroups: () => void,
    addOutcomeGroup: () => void,
    addGroupToOutcome: () => void,
    removeGroupFromOutcome: () => void,
    groups: [],
    outcomes: []
  };

  componentDidMount() {
    this.props.fetchOutcomes();
    this.props.fetchOutcomeGroups();
  }

  getOutcomeGroups() {
    return this.props.groups || [];
  }

  getOutcomes() {
    return this.props.outcomes || [];
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="body-container">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Outcomes</h1>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6 text-center">
                <CreateOutcome onSubmit={this.props.addOutcome} />
              </div>
              <div className="col-md-6 text-center">
                <CreateOutcomeGroup onSubmit={this.props.addOutcomeGroup} />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 text-center">
                <OutcomesTable
                  addGroupToOutcome={this.props.addGroupToOutcome}
                  removeGroupFromOutcome={this.props.removeGroupFromOutcome}
                  groups={this.getOutcomeGroups()}
                  outcomes={this.getOutcomes()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.outcomes;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OutcomesPage);
