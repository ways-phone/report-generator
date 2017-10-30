import React, { Component } from 'react';

export default class KpiTable extends Component {
  props: {
    kpis: []
  };

  render() {
    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Conversion Target</th>
            <th>Contact Target</th>
          </tr>
        </thead>
        <tbody>
          {this.props.kpis.map(kpi => (
            <tr>
              <td>{kpi.name}</td>
              <td>{kpi.conversion}%</td>
              <td>{kpi.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
