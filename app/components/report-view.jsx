import React, { Component } from 'react';

export default class ReportView extends Component {
  props: {
    handleFilterChange: () => void,
    search: string,
    clearReport: () => void,
    finalReport: [],
    getReport: () => void,
  };

  render() {
    return (
      <div>
        <div style={{ marginLeft: '2.5%', marginRight: '2.5%' }}>
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>
                <div className="pull-left">
                  <input
                    className="form-control"
                    onChange={e => this.props.handleFilterChange(e)}
                    value={this.props.search}
                    placeholder="filter"
                  />
                </div>
                Generate Report
                <i
                  onClick={this.props.clearReport}
                  className="pull-right glyphicon glyphicon-remove clean-btn"
                />
              </h1>
            </div>
          </div>
          <div className="row">
            <div
              style={{ maxHeight: '88vh', overflow: 'auto', width: '95vw' }}
              className="col-md-12"
            >
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ minWidth: '182px', textAlign: 'center' }}>
                      Campaign
                    </th>
                    {this.props.finalReport[0].results.map(res => (
                      <th style={{ minWidth: '116px', textAlign: 'center' }}>
                        {res.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.props.getReport().map(row => (
                    <tr>
                      <td>{row.name}</td>
                      {row.results.map(res => (
                        <td style={{ textAlign: 'center' }}>{res.value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
