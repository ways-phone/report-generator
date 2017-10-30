import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/action.generate-report';

import Sidebar from '../components/sidebar';
import ChooseReport from '../components/choose-report';
import ReportView from '../components/report-view';

class GenerateReportPage extends Component {
  props: {
    fetchOutcomes: () => void,
    fetchOutcomeGroups: () => void,
    fetchCampaignKpis: () => void,
    fetchReportTypes: () => [],
    generateReport: config => void,
    clearReport: () => void,
    groups: [],
    outcomes: [],
    reports: [],
    kpis: [],
    finalReport: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedReport: '',
      selectedFile: '',
      finalReport: this.props.finalReport,
      search: '',
    };
  }

  componentDidMount() {
    this.props.fetchOutcomes();
    this.props.fetchOutcomeGroups();
    this.props.fetchCampaignKpis();
    this.props.fetchReportTypes();
  }

  selectReport(e) {
    const id = e.target.value;
    console.log(id);
    const selected = this.props.reports.filter(t => t._id === id)[0];
    console.log(selected);
    this.setState({ ...this.state, selectedReport: selected });
  }

  selectFile(e) {
    const name = e.target.value;
    console.log(name);
    this.setState({ ...this.state, selectedFile: this.props[name] });
  }

  submit() {
    this.props.generateReport({
      reportType: this.state.selectedReport,
      data: this.state.selectedFile,
      outcomes: this.props.outcomes,
      groups: this.props.groups,
      kpis: this.props.kpis,
    });
  }

  handleFilterChange(e) {
    this.setState({ ...this.state, filter: e.target.value });
  }

  getReport() {
    if (!this.state.filter) return this.props.finalReport;
    return this.props.finalReport.filter(
      t =>
        t.name.toLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) !==
        -1
    );
  }

  render() {
    console.log(this.state);
    if (!this.props.finalReport) {
      return (
        <ChooseReport
          agents={this.props.agents}
          campaigns={this.props.campaigns}
          reports={this.props.reports}
          selectedFile={this.state.selectedFile}
          selectedReport={this.state.selectedReport}
          selectReport={this.selectReport.bind(this)}
          selectFile={this.selectFile.bind(this)}
          submit={this.submit.bind(this)}
        />
      );
    }
    return (
      <ReportView
        handleFilterChange={this.handleFilterChange.bind(this)}
        search={this.state.search}
        clearReport={this.props.clearReport}
        finalReport={this.props.finalReport}
        getReport={this.getReport.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  const newState = { ...state.generateReport };
  newState.agents = state.upload.agents.data;
  newState.campaigns = state.upload.campaigns.data;
  console.log(newState);
  return newState;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateReportPage);
