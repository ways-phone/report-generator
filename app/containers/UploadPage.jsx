import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/action.upload';

import { Link } from 'react-router-dom';

import Sidebar from '../components/sidebar';
import SelectFileButton from '../components/select-file-button';
import UploadedFile from '../components/uploaded-file';
import GenerateReportButton from '../components/generate-report-button';

import styles from '../styles/select-file-button.css';

class UploadPage extends Component {
  props: {
    agents: {},
    campaigns: {},
    readFile: () => void,
    uploadComplete: boolean,
    removeUploadedFiles: () => void
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const button = <SelectFileButton upload={this.props.readFile} />;

    return (
      <div>
        <Sidebar location="Upload" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <i
                onClick={this.props.removeUploadedFiles}
                className="pull-right glyphicon glyphicon-remove clean-btn"
                style={{ fontSize: '40px', marginTop: '20px' }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">{button}</div>
          </div>
          <hr />
          <UploadedFile files={this.props.files} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.upload;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
