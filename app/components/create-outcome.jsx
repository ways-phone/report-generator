import React, { Component } from 'react';
import Outcome from '../models/outcome';

export default class CreateOutcome extends Component {
  props: {
    onSubmit: (outcome: Outcome) => void
  };

  constructor(props) {
    super(props);
    this.state = {
      outcome: new Outcome(),
    };

    console.log(this.props);
  }

  submit() {
    this.props.onSubmit(this.state.outcome);
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
