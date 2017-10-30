import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import AlertContainer from 'react-alert';

export default class AddStatic extends Component {
  props: {
    cancel: () => void,
    outcomes: [],
    options: [],
    columns: [],
    submit: () => void,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
      type: 'static',
      errors: {
        name: '',
        type: '',
      },
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

    if (!this.state.value) {
      this.msg.show('Please enter a column type', {
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

  handleValueChange(e) {
    this.setState({ ...this.state, value: e.target.value });
  }

  submit() {
    if (this.validate()) {
      this.state.id = uuidv1();
      console.log(this.state);
      this.props.submit({
        id: this.state.id,
        name: this.state.name,
        value: this.state.value,
        type: this.state.type,
      });
    }
  }

  render() {
    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>
              Add Static Column{' '}
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
            <div className="form-group col-md-6">
              <label>Column Name</label>
              <input
                className="form-control"
                onChange={e => this.handleNameChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Type</label>
              <select
                className="form-control"
                onChange={e => this.handleValueChange(e)}
              >
                <option disabled selected>
                  Select an Outcome Group
                </option>
                {this.props.options.map(group => <option>{group.name}</option>)}
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
