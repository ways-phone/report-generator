import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../actions/action.upload";

import { Link } from "react-router-dom";

import Sidebar from "../components/sidebar";
import SelectFileButton from "../components/select-file-button";
import UploadedFile from "../components/uploaded-file";
import GenerateReportButton from "../components/generate-report-button";

import styles from "../styles/select-file-button.css";

class UploadPage extends Component {
  props: {
    agents: {},
    campaigns: {},
    readFile: () => void,
    uploadComplete: boolean
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // const dir = __dirname.replace(/\s/g, "%20").replace(/\\/g, "/");
    // const route = `file:///${dir}/app.html#/data`;
    // if (this.props.uploadComplete) {
    //   location.replace(route);
    // }
  }

  render() {
    const selectFileButton = <SelectFileButton upload={this.props.readFile} />;
    const generateReportButton = <GenerateReportButton />;
    const button = this.props.uploadComplete
      ? generateReportButton
      : selectFileButton;
    if (!this.props.uploadComplete) {
      return (
        <div>
          <Sidebar />
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">{button}</div>
            </div>
            <hr />
            <UploadedFile files={this.props.files} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Sidebar />
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>
                  All Files Uploaded.<Link to="/data">View Data</Link>{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return state.upload;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
