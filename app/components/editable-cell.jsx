import React, { Component } from 'react';

export default class EditableCell extends Component {
  props: {
    value: string | number,
    field: string,
    campaign: {},
    submit: campaign => void,
    validate: (() => boolean) | void,
    clearErrors: () => void
  };

  constructor(props) {
    super(props);
    this.state = { editing: false, value: this.props.value };
  }

  tdClass = 'edit-td';

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  onChange(e) {
    this.setState({ ...this.state, value: e.target.value });
  }

  validate(number) {
    if (!this.props.validate) return true;
    this.tdClass = 'edit-td error';
    return this.props.validate(number);
  }

  cancel() {
    this.tdClass = 'edit-td';
    this.props.clearErrors();
    this.setState({ ...this.state, editing: false, value: this.props.value });
  }

  submit() {
    if (!this.validate(this.state.value)) return;

    const updated = { ...this.props.campaign };
    updated[this.props.field] = this.state.value;
    this.props.submit(updated);
    this.toggleEditing();
  }

  render() {
    return this.state.editing ? (
      <td className={this.tdClass}>
        <div>
          <input onChange={e => this.onChange(e)} className="table-form" value={this.state.value} />
          <i
            onClick={this.cancel.bind(this)}
            className="pull-right hidden-xs showopacity glyphicon glyphicon-trash add-row"
          />
          <i
            onClick={this.submit.bind(this)}
            className="pull-right hidden-xs showopacity glyphicon glyphicon-ok add-row"
          />
        </div>
      </td>
    ) : (
      <td className="text-center">
        <div onClick={this.toggleEditing.bind(this)}>{this.props.value}</div>
      </td>
    );
  }
}
