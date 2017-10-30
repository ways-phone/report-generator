import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import AlertContainer from 'react-alert';

export default class AddFormula extends Component {
  props: {
    cancel: () => void,
    options: [],
    submit: column => void,
    columns: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value1: '',
      operator: '',
      value2: '',
      type: 'formula',
    };
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 5000,
    transition: 'scale',
  };

  validate() {
    let isValid = true;
    if (!this.state.name) {
      this.msg.show('Please enter a column name', {
        time: 2000,
        type: 'error',
      });

      isValid = false;
    }
    if (
      this.props.columns.filter(col => col.name === this.state.name).length > 0
    ) {
      this.msg.show('That column already exists', {
        time: 2000,
        type: 'error',
      });
      isValid = false;
    }

    if (!this.state.value1) {
      this.msg.show('Please enter a first value', {
        time: 2000,
        type: 'error',
      });

      isValid = false;
    }

    if (!this.state.operator) {
      this.msg.show('Please enter an operator', {
        time: 2000,
        type: 'error',
      });

      isValid = false;
    }

    if (!this.state.value2) {
      this.msg.show('Please enter a second value', {
        time: 2000,
        type: 'error',
      });

      isValid = false;
    }

    return isValid;
  }

  handleNameChange(e) {
    this.setState({ ...this.state, name: e.target.value });
  }

  handleValueTwoChange(e) {
    this.setState({ ...this.state, value2: e.target.value });
  }

  handleValueOneChange(e) {
    this.setState({ ...this.state, value1: e.target.value });
  }

  handleOperatorChange(e) {
    this.setState({ ...this.state, operator: e.target.value });
  }

  submit() {
    if (this.validate()) {
      this.state.id = uuidv1();
      console.log(this.state);
      this.props.submit(this.state);
    }
  }

  render() {
    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>
              Add Formula Column{' '}
              <i
                onClick={this.props.cancel}
                className="pull-right glyphicon glyphicon-remove clean-btn"
              />
            </h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <form className="col-md-12">
            <div className="form-group col-md-12">
              <label>Column Name</label>
              <input
                className="form-control"
                onChange={e => this.handleNameChange(e)}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Outcome Group 1</label>
              <select
                className="form-control"
                onChange={e => this.handleValueOneChange(e)}
              >
                <option disabled selected>
                  Select an Outcome Group
                </option>
                {this.props.options.map(option => (
                  <option>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>Operator</label>
              <select
                onChange={e => this.handleOperatorChange(e)}
                className="form-control"
              >
                <option disabled selected>
                  Select an operator
                </option>
                <option>+</option>
                <option>-</option>
                <option>/</option>
                <option>*</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>Outcome Group 2</label>
              <select
                className="form-control"
                onChange={e => this.handleValueTwoChange(e)}
              >
                <option disabled selected>
                  Select an Outcome Group
                </option>
                {this.props.options.map(option => (
                  <option>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-12" />
            <div className="form-group col-md-12">
              <button className="form-control" onClick={this.submit.bind(this)}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
