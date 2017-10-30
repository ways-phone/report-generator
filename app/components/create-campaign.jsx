import React, { Component } from 'react';

export default class CreateKPI extends Component {
  props: {
    onSubmit: (outcome: Outcome) => void
  };

  constructor(props) {
    super(props);
    this.state = {
      campaign: {
        name: '',
        conversion: 0.0,
        contact: 0,
      },
      err: '',
    };
  }

  isNumber(text) {
    if (text.length > 0) return !!text.trim().match(/^\d+$/);
    return true;
  }

  isInRange(number) {
    return number > 0 && number < 101;
  }

  submit() {
    this.props.onSubmit(this.state.campaign);
  }

  changeName(e) {
    const name = e.target.value;
    this.setState({ ...this.state, campaign: { ...this.state.campaign, name }, err: '' });
  }

  changeConversion(e) {
    const conversion = e.target.value;
    if (!this.isNumber(conversion)) return this.setState({ ...this.state, err: 'Not a Number!' });
    if (!this.isInRange(conversion)) {
      return this.setState({ ...this.state, err: 'Not a Percentage!' });
    }
    this.setState({
      ...this.state,
      campaign: { ...this.state.campaign, conversion: Number(conversion) },
      err: '',
    });
  }

  changeContact(e) {
    const contact = e.target.value;
    if (!this.isNumber(contact)) return this.setState({ ...this.state, err: 'Not a Number!' });
    this.setState({
      ...this.state,
      campaign: { ...this.state.campaign, contact: Number(contact) },
      err: '',
    });
  }

  render() {
    return (
      <div>
        <h3>Add KPI</h3>
        <form className="col-md-12">
          <div className="form-group">
            <input
              onChange={this.changeName.bind(this)}
              className="form-control"
              placeholder="Enter Campaign name"
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.changeConversion.bind(this)}
              className="form-control"
              placeholder="Enter Conversion Target"
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.changeContact.bind(this)}
              className="form-control"
              placeholder="Enter Contact Target"
            />
          </div>
          <div className="form-group">
            <button
              disabled={this.state.err}
              onClick={this.submit.bind(this)}
              className="form-control"
            >
              <i className="glyphicon glyphicon-plus" />
            </button>
          </div>
          <div className="form-group has-error">
            <span className="help-block has-error">{this.state.err}</span>
          </div>
        </form>
      </div>
    );
  }
}
