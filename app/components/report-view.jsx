import React, { Component } from 'react';
import { remote } from 'electron';
import fs from 'fs';
import papa from 'papaparse';
import xlsx from 'xlsx';

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

  saveReport() {
    remote.dialog.showSaveDialog({}, path => {
      const report = this.formatReportForDownload();
      const wb = xlsx.utils.book_new();
      wb.Sheets = {};
      wb.SheetNames.push('Report');
      const sheet = xlsx.utils.json_to_sheet(report);
      console.log(sheet);
      wb.Sheets['Report'] = sheet;
      this.convertColumns(wb);
      console.log(wb);

      xlsx.writeFile(wb, path + 'xlsx', { bookType: 'xlsx' });
      // fs.writeFileSync(path + '.xlsx', papa.unparse(report));
    });
  }

  convertColumns(wb) {
    const sheet = wb.Sheets['Report'];

    Object.keys(sheet).forEach(key => {
      if (key === '!ref') return;
      if (key.indexOf('A') === -1) {
        sheet[key].t = 'n';
      }
    });
  }

  formatReportForDownload() {
    const report = this.props.finalReport;

    const download = [];
    report.forEach(row => {
      const formatted = {};
      formatted.Name = row.name;
      if (row.name === 'Total') {
        download.push(this.createTotal());
      } else {
        row.results.forEach(result => {
          if (result.isPercentage) {
            formatted[result.name] = this.getNumber(result.value.toString());
          } else if (result.value === '0' || result.value === 0) {
            formatted[result.name] = '';
          } else if (result.value.toString().match(/\d/)) {
            formatted[result.name] = this.getNumber(result.value.toString());
          } else {
            formatted[result.name] = result.value;
          }
        });
        download.push(formatted);
      }
    });

    return download;
  }

  createTotal() {
    const report = this.props.finalReport;
    const total = {};
    report.forEach(row => {
      if (row.name === 'Total') return;
      row.results.forEach(result => {
        if (result.isPercentage) {
          total[result.name] = '';
        } else if (result.name === 'Hours') {
          total[result.name] = !total[result.name]
            ? (total[result.name] = Number(result.value))
            : (total[result.name] += Number(result.value));
        } else if (!total[result.name]) {
          total[result.name] = result.value;
        } else {
          total[result.name] += result.value;
        }
      });
    });
    total.Name = 'Total';
    return total;
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
                  onClick={this.saveReport.bind(this)}
                  className="pull-right glyphicon glyphicon-save clean-btn"
                />
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
