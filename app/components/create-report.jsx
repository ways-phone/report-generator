import React, { Component } from 'react';
import Dragula from 'react-dragula';
import _ from 'underscore';
import AlertContainer from 'react-alert';

import AddFormula from './add-formula';
import AddStatic from './add-static';
import CreateReportTable from './create-report-table';

export default class CreateReport extends Component {
  props: {
    options: [],
    create: report => void,
    edit: report => void,
    cancel: () => void,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCreatingFormula: false,
      isCreatingStatic: false,
      columns: [],
      ordered: [],
      validOrder: true,
      invalidItems: [],
      name: '',
    };
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 5000,
    transition: 'scale',
  };

  componentDidMount() {
    this.initColumns();
  }

  componentDidUpdate() {
    if (!this.state.success) return;

    this.setMessage(this.state.success, 'success');
  }

  getOptions() {
    return this.props.options.concat(this.state.columns.map(column => column));
  }

  initColumns() {
    if (!this.props.report) return;
    if (this.state.columns.length > 0) return;

    this.setState({
      ...this.state,
      name: this.props.report.name,
      columns: this.props.report.columns,
      ordered: this.props.report.columns,
    });
  }

  getColumns() {
    return this.state.ordered.length > 0
      ? this.state.ordered
      : this.state.columns;
  }

  findInvalidColumns(cols) {
    const invalidItems = [];

    cols.forEach((column, index) => {
      for (let i = 0; i < index; i++) {
        const columnToCheck = cols[i];
        if (columnToCheck.value.indexOf(column.name) === -1) continue;
        invalidItems.push({ dependant: columnToCheck, main: column });
      }
    });

    return invalidItems;
  }

  setInvalidColumnMessages(invalidItems, validOrder) {
    if (validOrder) return;

    invalidItems.forEach(({ dependant, main }) => {
      this.setMessage(`${dependant.name} relies upon ${main.name} to exist`);
    });
  }

  verifyColumnDependencies(cols) {
    const invalidItems = this.findInvalidColumns(cols);

    const validOrder = invalidItems.length === 0;

    this.setInvalidColumnMessages(invalidItems, validOrder);

    this.setState({
      ...this.state,
      validOrder,
      invalidItems,
      ordered: cols,
      success: '',
    });
  }

  setColumns(columns) {
    this.setState({
      ...this.state,
      isCreatingFormula: false,
      isCreatingStatic: false,
      columns,
      ordered: columns,
      success: 'Column added successfully',
    });
  }

  addFormulaColumn(column) {
    const columns = this.getColumns();
    column.value = `${column.value1} ${column.operator} ${column.value2}`;
    columns.push(column);
    this.setColumns(columns);
  }

  addStaticColumn(column) {
    const columns = this.getColumns();
    columns.push(column);
    this.setColumns(columns);
  }

  setPage(isCreatingFormula, isCreatingStatic) {
    this.setState({
      ...this.state,
      isCreatingFormula,
      isCreatingStatic,
      success: '',
    });
  }

  clearScreen() {
    this.setState({
      ...this.state,
      isCreatingFormula: false,
      isCreatingStatic: false,
      success: '',
    });
  }

  canDelete(currentCol) {
    return (
      this.getColumns().filter(
        column => column.value.indexOf(currentCol.name) !== -1
      ).length === 0
    );
  }

  setMessage(message, type = 'error') {
    this.msg.show(message, {
      time: 2000,
      type,
    });
  }

  removeColumn(currentCol) {
    if (!this.canDelete(currentCol)) {
      return this.setMessage(`${currentCol.name} is required by other columns`);
    }
    const updated = this.getColumns().filter(
      column => !_.isMatch(currentCol, column)
    );
    this.setState({
      ...this.state,
      columns: updated,
      ordered: updated,
      success: ' Column removed successfully',
    });
  }

  setErrorClass(column) {
    const isInvalid =
      this.state.invalidItems.filter(
        ({ dependant, main }) =>
          dependant.id === column.id || main.id === column.id
      ).length > 0;

    return isInvalid ? 'error' : '';
  }

  submit() {
    if (this.state.ordered.length < 1) return;
    if (this.state.name.trim().length < 1) {
      this.setMessage('A Report name must be set');
      return;
    }
    const report = { name: this.state.name, columns: this.state.ordered };

    if (this.props.report) {
      report._id = this.props.report._id;
      this.props.edit(report);
    } else {
      this.props.create(report);
    }
  }

  onNameChange(e) {
    this.setState({ ...this.state, name: e.target.value, success: '' });
  }

  render() {
    if (!this.props.options) return <div />;

    if (this.state.isCreatingFormula) {
      return (
        <AddFormula
          submit={this.addFormulaColumn.bind(this)}
          cancel={this.clearScreen.bind(this)}
          options={this.getOptions()}
          columns={this.state.columns}
        />
      );
    }

    if (this.state.isCreatingStatic) {
      return (
        <AddStatic
          submit={this.addStaticColumn.bind(this)}
          cancel={this.clearScreen.bind(this)}
          outcomes={this.props.outcomes}
          options={this.getOptions()}
          columns={this.state.columns}
        />
      );
    }

    if (this.state.columns && this.state.columns.length > 0) {
      return (
        <div>
          <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>
                Create Report: <small>Add Column</small>
                <i
                  onClick={this.props.cancel}
                  className="pull-right glyphicon glyphicon-remove clean-btn"
                />
              </h1>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-md-6 text-center">
              <button
                onClick={e => this.setPage(true, false)}
                className="btn-create-report"
              >
                Formula
              </button>
            </div>
            <div className="col-md-6 text-center">
              <button
                onClick={e => this.setPage(false, true)}
                className="btn-create-report"
              >
                Static
              </button>
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>Current Report</h3>
              <div className="col-md-4 col-md-offset-4">
                <input
                  onChange={e => this.onNameChange(e)}
                  value={this.state.name}
                  className="form-control"
                  placeholder="Report Name"
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <CreateReportTable
              columns={this.state.columns}
              ordered={this.state.ordered}
              removeColumn={this.removeColumn.bind(this)}
              setErrorClass={this.setErrorClass.bind(this)}
              verifyColumns={this.verifyColumnDependencies.bind(this)}
            />
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="col-md-4 col-md-offset-4">
                <button
                  onClick={this.submit.bind(this)}
                  className="form-control"
                >
                  {this.props.report ? 'Edit' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>
              Create Report: <small>Add Column</small>
              <i
                onClick={this.props.cancel}
                className="pull-right glyphicon glyphicon-remove clean-btn"
              />
            </h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 text-center">
            <button
              onClick={e => this.setPage(true, false)}
              className="btn-create-report"
            >
              Formula
            </button>
          </div>
          <div className="col-md-6 text-center">
            <button
              onClick={e => this.setPage(false, true)}
              className="btn-create-report"
            >
              Static
            </button>
          </div>
        </div>
      </div>
    );
  }
}
