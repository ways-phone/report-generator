import React, { Component } from 'react';
import { remote } from 'electron';
import AlertContainer from 'react-alert';

import ExcelWriter from '../utils/ExcelWriter';

export default class ReportView extends Component {
  props: {
    handleFilterChange: () => void,
    filter: string | void,
    clearReport: () => void,
    finalReport: [],
    getReport: () => void,
    sort: name => void,
    sortedBy: string | void
  };

  constructor(props) {
    super(props);
    this.state = {
      sorted: '',
      sortedBy: ''
    };
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  };

  setMessage(message, type = 'error') {
    this.msg.show(message, {
      time: 2000,
      type
    });
  }

  clearReport() {
    this.props.clearReport();
    this.setState({
      sorted: '',
      sortedBy: ''
    });
  }

  saveReport() {
    remote.dialog.showSaveDialog({}, path => {
      const excelWriter = new ExcelWriter(this.getReport());
      const result = excelWriter.saveReport(path);
      const type = result.success ? 'success' : 'error';
      this.setMessage(result.msg, type);
    });
  }

  formatTableCell(result) {
    if (result.isPercentage) {
      return (
        <td style={{ textAlign: 'center' }}>
          {Number(result.value * 100).toFixed(2)}%
        </td>
      );
    }
    const num = this.getNumber(result.value.toString());
    return <td style={{ textAlign: 'center' }}>{num}</td>;
  }

  getNumber(value) {
    if (value.match(/\./)) {
      return Number(value).toFixed(2);
    }
    return value;
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

  getTableHeaderArrow(name) {
    console.log(this.props.sortedBy);
    if (this.props.sortedBy === name)
      return 'glyphicon glyphicon-chevron-up pull-right';
    return 'glyphicon glyphicon-chevron-down pull-right';
  }

  render() {
    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
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
                {this.props.selectedReport}
                <i
                  onClick={this.clearReport.bind(this)}
                  className="pull-right glyphicon glyphicon-remove clean-btn"
                />
                <i
                  onClick={this.saveReport.bind(this)}
                  className="glyphicon glyphicon-save clean-btn"
                  style={{
                    marginLeft: '20px',
                    marginTop: '10px'
                  }}
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
                        style={{ fontSize: '16px' }}
                        onClick={() =>
                          this.props.sort('Campaign', this.props.getReport())
                        }
                        className={this.getTableHeaderArrow('Campaign')}
                      />
                    </th>
                    {this.props.finalReport[0].results.map(res => (
                      <th style={{ minWidth: '116px', textAlign: 'center' }}>
                        {res.name}
                        <i
                          style={{ fontSize: '16px' }}
                          onClick={() =>
                            this.props.sort(res.name, this.props.getReport())
                          }
                          className={this.getTableHeaderArrow(res.name)}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.getReport().map(row => (
                    <tr>
                      <td>{row.name}</td>
                      {row.results.map(this.formatTableCell.bind(this))}
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
