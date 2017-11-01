import React, { Component } from 'react';

export default class ReportView extends Component {
  props: {
    handleFilterChange: () => void,
    filter: string,
    clearReport: () => void,
    finalReport: [],
    getReport: () => void,
    sort: name => void
  };

  constructor(props) {
    super(props);
    this.state = {
      sorted: '',
      sortedBy: ''
    };
  }

  formatTableCell(result) {
    if (result.isPercentage) {
      return (
        <td style={{ textAlign: 'center' }}>
          {Number(result.value * 100).toFixed(2)}%
        </td>
      );
    }
    return <td style={{ textAlign: 'center' }}>{result.value}</td>;
  }

  getReport() {
    if (this.state.sorted) {
      if (!this.props.filter) {
        return this.state.sorted;
      }
      return this.props.getReport();
    }
    return this.props.getReport();
  }

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
                    value={this.props.filter}
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
                      <i
                        onClick={() =>
                          this.props.sort('Campaign', this.props.getReport())}
                        className="caret pull-right"
                      />
                    </th>
                    {this.props.finalReport[0].results.map(res => (
                      <th style={{ minWidth: '116px', textAlign: 'center' }}>
                        {res.name}
                        <i
                          onClick={() =>
                            this.props.sort(res.name, this.props.getReport())}
                          className="caret pull-right"
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.getReport().map(row => (
                    <tr>
                      <td>{row.name}</td>
                      {row.results.map(this.formatTableCell)}
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
