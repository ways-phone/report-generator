import React, { Component } from 'react';

import EditableCell from './editable-cell';

export default class EdiTable extends Component {
  props: {
    data: [],
    onSubmit: () => void,
    update: campaign => void,
    delete: campaign => void,
    errors:
      | {
          message: string
        }
      | {}
      | void,
    success: string | void
  };

  static isNumber(text) {
    if (text.length > 0) return !!text.trim().match(/^(\d+\.?\d*|\.\d+)$/);
    return true;
  }

  static isInRange(number) {
    if (number.length < 1) return true;

    try {
      const num = Number(number);
      return num > 0 && num < 101;
    } catch (err) {
      return false;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      campaign: {
        name: '',
        conversion: '',
        contact: ''
      },
      reqErrors: this.props.errors,
      validationErrors: '',
      isEditing: false,
      filter: ''
    };
  }

  submit(e) {
    e.preventDefault();
    const campaign = this.state.campaign;
    if (campaign.name.trim().length > 0) {
      this.props.onSubmit(campaign);
      this.setState({
        ...this.state,
        campaign: { name: '', conversion: '', contact: '' },
        validationErrors: ''
      });
    } else {
      this.setState({ ...this.state, validationErrors: 'Invalid KPI!' });
    }
  }

  changeName(e) {
    const name = e.target.value;
    this.setState({
      ...this.state,
      campaign: { ...this.state.campaign, name },
      err: ''
    });
  }

  changeConversion(e) {
    const conversion = e.target.value;
    if (!EdiTable.isNumber(conversion)) {
      return this.setState({
        ...this.state,
        validationErrors: 'Not a Number!'
      });
    }
    if (!EdiTable.isInRange(conversion)) {
      return this.setState({
        ...this.state,
        validationErrors: 'Not a Percentage!'
      });
    }
    this.setState({
      ...this.state,
      campaign: { ...this.state.campaign, conversion },
      err: ''
    });
  }

  changeContact(e) {
    const contact = e.target.value;
    if (!EdiTable.isNumber(contact)) {
      return this.setState({
        ...this.state,
        validationErrors: 'Not a Number!'
      });
    }
    this.setState({
      ...this.state,
      campaign: { ...this.state.campaign, contact: Number(contact) },
      err: ''
    });
  }

  validateConversion(number) {
    if (EdiTable.isInRange(number) && EdiTable.isNumber(number)) return true;
    this.setState({
      ...this.state,
      validationErrors: 'Invalid Conversion Entered'
    });
  }

  validateContact(number) {
    if (EdiTable.isNumber(number)) return true;
    this.setState({
      ...this.state,
      validationErrors: 'Invalid Contact Entered'
    });
  }

  validateName(name) {
    if (name.trim().length > 0) return true;
    this.setState({ ...this.state, validationErrors: 'Invalid Name Entered' });
  }

  clearErrors() {
    this.setState({ ...this.state, validationErrors: '' });
  }

  getReqError() {
    console.log(this.props.errors);
    if (this.props.errors && this.props.errors.message)
      return this.props.errors.message;
  }

  setInputRow() {
    if (!this.state.isEditing) return;
    return (
      <tr>
        <td className="form-td">
          <input
            value={this.state.campaign.name}
            onChange={this.changeName.bind(this)}
            className="table-form"
            placeholder="Enter Campaign name"
          />
        </td>
        <td className="form-td">
          <input
            value={this.state.campaign.conversion}
            onChange={this.changeConversion.bind(this)}
            className="table-form"
            placeholder="Enter Conversion Target"
          />
        </td>
        <td className="form-td">
          <input
            value={this.state.campaign.contact}
            onChange={this.changeContact.bind(this)}
            className="table-form"
            placeholder="Enter Contact Target"
          />
        </td>
        <td className="form-td">
          <div className="text-center">
            <i
              disabled={this.state.err}
              onClick={this.submit.bind(this)}
              className="glyphicon glyphicon-ok add-row"
            />
          </div>
        </td>
      </tr>
    );
  }

  setFeedback() {
    if (this.state.validationErrors) {
      return (
        <div className="has-error text-center">
          <span
            style={{ fontSize: '32px', color: '#ff7976' }}
            className="help-block"
          >
            {this.state.validationErrors}
          </span>
        </div>
      );
    }
    if (this.props.errors && this.props.errors.message) {
      return (
        <div className="has-error text-center">
          <span
            style={{ fontSize: '32px', color: '#ff7976' }}
            className="help-block"
          >
            {this.getReqError()}
          </span>
        </div>
      );
    }
    if (this.props.success) {
      return (
        <div className="has-success text-center">
          <span
            style={{ fontSize: '32px', color: 'rgb(132, 255, 118)' }}
            className="help-block"
          >
            {this.props.success || ''}
          </span>
        </div>
      );
    }
  }

  toggleIsEditing() {
    this.setState({
      ...this.state,
      isEditing: !this.state.isEditing,
      campaign: { name: '', conversion: '', contact: '' }
    });
  }

  getEditGlyph() {
    return this.state.isEditing
      ? 'add-button pull-right glyphicon glyphicon-remove'
      : 'add-button pull-right glyphicon glyphicon-plus';
  }

  handleFilterChange(e) {
    this.setState({ ...this.state, filter: e.target.value });
  }

  getData() {
    if (!this.state.filter) return this.props.data;
    return this.props.data.filter(
      campaign =>
        campaign.name
          .toLowerCase()
          .indexOf(this.state.filter.toLocaleLowerCase()) !== -1
    );
  }

  render() {
    const isData = this.getData().length > 0;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>
              <div className="pull-left">
                <input
                  className="form-control"
                  onChange={e => this.handleFilterChange(e)}
                  value={this.state.search}
                  placeholder="filter"
                />
              </div>
              KPI
              <i
                onClick={this.toggleIsEditing.bind(this)}
                className={this.getEditGlyph()}
              />
            </h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            {isData ? (
              <table className="table table-bordered">
                <thead>
                  <tr className="header-row">
                    <th className="text-center">Campaign</th>
                    <th className="text-center">Conversion Target</th>
                    <th className="text-center">Contact Target</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.setInputRow()}
                  {this.getData().map(kpi => (
                    <tr key={kpi._id}>
                      <EditableCell
                        validate={this.validateName.bind(this)}
                        submit={this.props.update}
                        campaign={kpi}
                        field="name"
                        value={kpi.name}
                        clearErrors={this.clearErrors.bind(this)}
                      />
                      <EditableCell
                        validate={this.validateConversion.bind(this)}
                        submit={this.props.update}
                        campaign={kpi}
                        field="conversion"
                        value={kpi.conversion}
                        clearErrors={this.clearErrors.bind(this)}
                      />
                      <EditableCell
                        validate={this.validateContact.bind(this)}
                        submit={this.props.update}
                        campaign={kpi}
                        field="contact"
                        value={kpi.contact}
                        clearErrors={this.clearErrors.bind(this)}
                      />
                      <td>
                        <div className="text-center">
                          <i
                            onClick={() => this.props.delete(kpi)}
                            className="glyphicon glyphicon-trash delete-td"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr className="header-row">
                    <th className="text-center">Campaign</th>
                    <th className="text-center">Conversion Target</th>
                    <th className="text-center">Contact Target</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>{this.setInputRow()}</tbody>
              </table>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">{this.setFeedback()}</div>
        </div>
      </div>
    );
  }
}
