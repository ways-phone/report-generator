import React, { Component } from 'react';

export default class CreateOutcomeGroup extends Component {
  props: {
    onSubmit: (outcome: Outcome) => void
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.group);
  }

  onChange(e) {
    const group = e.target.value;

    this.setState({ group: { name: group } });
  }

  render() {
    return (
      <div>
        <h3>Add outcome Group</h3>
        <form className="col-md-12">
          <div className="form-group">
            <input
              onChange={this.onChange.bind(this)}
              className="form-control"
              placeholder="Enter outcome group name name"
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
