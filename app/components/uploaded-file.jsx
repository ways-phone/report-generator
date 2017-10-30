import React, { Component } from 'react';
import styles from '../styles/uploaded-file.css';

class UploadedFile extends Component {
  props: {
    files: string[],
  };

  constructor(props) {
    super(props);
    this.state = {
      files: [
        'campaigns.csv',
        'campaigns_cph.csv',
        'agents.csv',
        'agents_cph.csv',
      ],
    };
  }

  setFileMarked(file) {
    console.log(this.props.files);
    const exists =
      this.props.files.filter(f => f.indexOf(file) !== -1).length > 0;

    return exists ? <i className="glyphicon glyphicon-ok" /> : '';
  }

  render() {
    return (
      <div style={{ marginTop: '8vh' }} className="row">
        <div className="col-md-8 col-md-offset-2">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center">File</th>
                <th className="text-center">Loaded</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map(file => (
                <tr>
                  <td className="text-center">{file}</td>
                  <td className="text-center">{this.setFileMarked(file)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UploadedFile;
