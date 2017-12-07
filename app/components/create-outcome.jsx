import React, { Component } from 'react';
import Outcome from '../models/outcome';
import AlertContainer from 'react-alert';

export default class CreateOutcome extends Component {
  props: {
    onSubmit: (outcome: Outcome) => void
  };

  constructor(props) {
    super(props);
    this.state = {
      outcome: new Outcome()
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

  submit(e) {
    e.preventDefault();
    if (this.state.outcome.getState().groups.length > 0) {
      this.props.onSubmit(this.state.outcome);
    } else {
      this.setMessage('An Outcome cannot be blank');
    }
  }

  onChange(e) {
    const name = e.target.value;
    const outcome = this.state.outcome;
    outcome.addProperty('name', name);
    this.setState({ outcome });
  }

  render() {
    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        <h3>Add Outcome</h3>
        <form className="col-md-12">
          <div className="form-group">
            <input
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Enter outcome name"
            />
          </div>
          <div className="form-group">
            <button onClick={this.submit.bind(this)} className="form-control">
              <i className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}
