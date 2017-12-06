import React, { Component } from 'react';
import _ from 'underscore';

export default class OutcomesTable extends Component {
  props: {
    groups: [],
    outcomes: [],
    addGroupToOutcome: () => void,
    removeGroupFromOutcome: () => void,
    removeOutcome: outcome => void,
    removeOutcomeGroup: group => void
  };

  getTd(group, outcome) {
    if (_.where(outcome.groups, group).length) {
      return (
        <td onClick={() => this.props.removeGroupFromOutcome(group, outcome)}>
          <i className="glyphicon glyphicon-ok" />
        </td>
      );
    }
    return <td onClick={() => this.props.addGroupToOutcome(group, outcome)} />;
  }

  removeOutcomeGroup(group) {
    this.props.removeOutcomeGroup(group);
  }

  removeOutcome(outcome) {
    this.props.removeOutcome(outcome);
  }

  getGroups() {
    return _.sortBy(this.props.groups, 'name');
  }

  getOutcomes() {
    return _.sortBy(this.props.outcomes, 'name');
  }
  render() {
    this.getOutcomes();
    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            {this.getGroups().map(group => (
              <th>
                {group.name}
                <i
                  onClick={() => this.removeOutcomeGroup(group)}
                  className="pull-right glyphicon glyphicon-remove clean-btn"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.getOutcomes().map(outcome => (
            <tr>
              <td>
                {outcome.name}{' '}
                <i
                  onClick={() => this.removeOutcome(outcome)}
                  className="pull-right glyphicon glyphicon-remove clean-btn"
                />
              </td>
              {this.getGroups().map(group => this.getTd(group, outcome))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
