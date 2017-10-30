import React, { Component } from "react";
import styles from "../styles/select-file-button.css";

export default class GenerateReportButton extends Component {
  render() {
    return (
      <div>
        <button className={styles.btnSelectFile}>
          <i className="fa fa-download" />
        </button>
      </div>
    );
  }
}
