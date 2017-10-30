import React, { Component } from "react";
import { remote } from "electron";
import Promise from "bluebird";
import styles from "../styles/select-file-button.css";

class SelectFileButton extends Component {
  props: {
    upload: () => void
  };
  constructor(props) {
    super(props);
    this.state = {};

    this.openFile.bind(this);
  }

  openFile = () => {
    remote.dialog.showOpenDialog(
      {
        filters: [{ name: "Excel", extensions: ["csv"] }],
        properties: ["multiSelections"]
      },
      fileNames => {
        Promise.each(fileNames, name => this.props.upload(name));
      }
    );
  };

  render() {
    return (
      <div>
        <button className={styles.btnSelectFile} onClick={this.openFile}>
          <i className="fa fa-search" />
        </button>
      </div>
    );
  }
}

export default SelectFileButton;
