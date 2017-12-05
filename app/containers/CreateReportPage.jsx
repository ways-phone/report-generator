import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AlertContainer from 'react-alert';
import * as actions from '../actions/action.create-report';

import Sidebar from '../components/sidebar';
import CreateReport from '../components/create-report';

export class CreateReportPage extends Component {
  props: {
    fetchOutcomes: () => void,
    fetchOutcomeGroups: () => void,
    fetchCampaignKpis: () => void,
    fetchReportTypes: () => [],
    saveReportType: () => void,
    updateReportType: () => void,
    deleteReportType: () => void,
    success: string,
    groups: [],
    outcomes: [],
    reports: []
  };

  constructor(props) {
    super(props);
    this.state = {
      creatingReport: false
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

  componentDidMount() {
    this.props.fetchOutcomes();
    this.props.fetchOutcomeGroups();
    this.props.fetchCampaignKpis();
    this.props.fetchReportTypes();
  }

  componentDidUpdate() {
    if (!this.props.success) return;
    if (this.props.success !== this.state.success) {
      this.setMessage(this.props.success, 'success');
      this.setState({
        ...this.state,
        success: this.props.success
      });
    }
  }

  getOptions() {
    return this.props.groups.concat([
      { name: 'Contact Target' },
      { name: 'Conversion Target' },
      { name: 'Hours' }
    ]);
  }

  updateReport(report) {
    this.props.updateReportType(report);
    this.setState({
      ...this.state,
      creatingReport: false,
      selectedReport: null,
      success: this.props.success
    });
  }

  createReport(report) {
    this.props.saveReportType(report);
    this.setState({
      ...this.state,
      creatingReport: false,
      selectedReport: null,
      success: this.props.success
    });
  }

  onSelectChange(e) {
    const id = e.target.value;
    let selectedReport;
    if (id) selectedReport = this.props.reports.filter(t => t._id === id)[0];

    this.setState({
      ...this.state,
      selectedReport
    });
  }

  setCreatingReport() {
    this.setState({ ...this.state, creatingReport: true });
  }

  returnHome() {
    this.setState({
      ...this.state,
      creatingReport: false,
      selectedReport: null
    });
  }

  deleteReport() {
    this.props.deleteReportType(this.state.selectedReport);
    this.setState({
      ...this.state,
      selectedReport: null,
      success: this.props.success
    });
  }

  render() {
    if (!this.props.groups)
      return (
        <div>
          <Sidebar />Havent loaded
        </div>
      );

    if (this.state.creatingReport) {
      return (
        <div>
          <Sidebar location="CreateReport" />
          <div className="body-container">
            <div className="container">
              <CreateReport
                outcomes={this.props.outcomes}
                options={this.getOptions()}
                create={this.createReport.bind(this)}
                edit={this.updateReport.bind(this)}
                cancel={this.returnHome.bind(this)}
                report={this.state.selectedReport}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Sidebar location="CreateReport" />
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        <div className="body-container">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Reports</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6 col-md-offset-3">
                  <select
                    onChange={e => this.onSelectChange(e)}
                    className="form-control"
                  >
                    <option disabled selected>
                      Select Report Type
                    </option>
                    <option />
                    {this.props.reports.map(report => (
                      <option value={report._id}>{report.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <hr />
            {this.state.selectedReport ? (
              <div>
                <div className="row">
                  <div className="col-md-6 text-center">
                    <button
                      onClick={this.setCreatingReport.bind(this)}
                      className="btn-create-report"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="col-md-6 text-center">
                    <button
                      onClick={this.deleteReport.bind(this)}
                      className="btn-create-report"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-md-12 text-center">
                    <h2>{this.state.selectedReport.name}</h2>
                  </div>
                  <hr />
                  <div style={{ overflowX: 'auto' }} className="col-md-12">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          {this.state.selectedReport.columns.map(column => (
                            <th style={{ minWidth: '159px' }}>{column.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {this.state.selectedReport.columns.map(column => (
                            <td>{column.value}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    onClick={this.setCreatingReport.bind(this)}
                    className="btn-create-report"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const newState = { ...state.createReport };
  newState.agents = state.upload.agents.data;
  newState.campaigns = state.upload.campaigns.data;
  return newState;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReportPage);
