import React, { Component } from 'react';
import Sidebar from '../components/sidebar';

export default class ChooseReport extends Component {
  props: {
    agents: [],
    campaigns: [],
    reports: [],
    selectedFile: {},
    selectedReport: {},
    selectReport: () => void,
    selectFile: () => void,
    submit: () => {}
  };

  render() {
    return (
      <div>
        <Sidebar location="GenerateReport" />
        <div className="container">
          <div className="body-container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Generate Report</h1>
              </div>
              <div className="col-md-12">
                <form>
                  <div className="col-md-6 form-group">
                    <label>Report</label>
                    <select
                      onChange={e => this.props.selectReport(e)}
                      className="form-control"
                    >
                      <option selected disabled>
                        Select a Report
                      </option>
                      {this.props.reports.map(report => (
                        <option value={report._id}>{report.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>File</label>
                    <select
                      onChange={e => this.props.selectFile(e)}
                      className="form-control"
                    >
                      <option selected disabled>
                        Select a File
                      </option>
                      {this.props.agents ? (
                        <option value="agents">Agents</option>
                      ) : (
                        ''
                      )}
                      {this.props.campaigns ? (
                        <option value="campaigns">Campaigns</option>
                      ) : (
                        ''
                      )}
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {this.props.selectedFile && this.props.selectedReport ? (
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    onClick={this.props.submit.bind(this)}
                    className="btn-create-report"
                  >
                    Generate
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}
