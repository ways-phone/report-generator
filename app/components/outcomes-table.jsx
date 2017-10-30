import React, { Component } from 'react';
import _ from 'underscore';

export default class OutcomesTable extends Component {
  props: {
    groups: [],
    outcomes: [],
    addGroupToOutcome: () => void,
    removeGroupFromOutcome: () => void
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

  render() {
    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            {this.props.groups.map(group => <th>{group.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.props.outcomes.map(outcome => (
            <tr>
              <td>{outcome.name}</td>
              {this.props.groups.map(group => this.getTd(group, outcome))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
