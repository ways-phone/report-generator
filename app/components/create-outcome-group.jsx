import React, { Component } from 'react';
import AlertContainer from 'react-alert';

export default class CreateOutcomeGroup extends Component {
  props: {
    onSubmit: (outcome: Outcome) => void
  };
  constructor(props) {
    super(props);
    this.state = {};
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
    if (this.state.group && this.state.group.name.trim()) {
      this.props.onSubmit(this.state.group);
    } else {
      this.setMessage('An outcome group cannot be blank.');
    }
  }

  onChange(e) {
    const group = e.target.value;

    this.setState({ group: { name: group } });
  }

  render() {
    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
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
