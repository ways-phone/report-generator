import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';

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
    finalReport: []
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedReport: '',
      selectedFile: '',
      finalReport: this.props.finalReport,
      search: '',
      sorted: '',
      sortedBy: ''
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

    const selected = this.props.reports.filter(t => t._id === id)[0];

    this.setState({ ...this.state, selectedReport: selected });
  }

  selectFile(e) {
    const name = e.target.value;

    this.setState({ ...this.state, selectedFile: this.props[name] });
  }

  submit() {
    this.props.generateReport({
      reportType: this.state.selectedReport,
      data: this.state.selectedFile,
      outcomes: this.props.outcomes,
      groups: this.props.groups,
      kpis: this.props.kpis
    });
  }

  handleFilterChange(e) {
    const filter = e.target.value;

    if (!filter) {
      this.setState({
        ...this.state,
        filter,
        sorted: '',
        sortedBy: ''
      });
    } else {
      this.setState({ ...this.state, filter });
    }
  }

  getReport() {
    if (!this.state.filter) return this.state.sorted || this.props.finalReport;
    const report = this.state.sorted || this.props.finalReport;
    return report.filter(
      t =>
        t.name.toLowerCase().indexOf(this.state.filter.toLocaleLowerCase()) !==
        -1
    );
  }

  _formatForSort(name, report) {
    const f = report.map(row => {
      return {
        name: row.name,
        value: row.results.filter(t => t.name === name)[0].value || 0
      };
    });

    return f;
  }

  sortByResultField(name, report) {
    const metric = _.sortBy(this._formatForSort(name, report), o => o.value);
    const sorted = [];

    metric.forEach(sortRow => {
      report.forEach(row => {
        if (row.name === sortRow.name) sorted.push(row);
      });
    });
    return sorted;
  }

  setSorted(name, sorted) {
    if (name === this.state.sortedBy) {
      sorted = sorted.reverse();
      name = '';
    }
    this.setState({ ...this.state, sorted, sortedBy: name });
  }

  sort(name, report) {
    if (name === 'Campaign') {
      this.setSorted(name, _.sortBy(report, t => t.name));
    } else {
      const sorted = this.sortByResultField(name, report);
      this.setSorted(name, sorted);
    }
  }

  render() {
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
        filter={this.state.filter}
        clearReport={this.props.clearReport}
        finalReport={this.props.finalReport}
        getReport={this.getReport.bind(this)}
        sort={this.sort.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  const newState = { ...state.generateReport };
  newState.agents = state.upload.agents.data;
  newState.campaigns = state.upload.campaigns.data;
  return newState;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateReportPage);
