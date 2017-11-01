import Promise from 'bluebird';

/*
 * This class is concerned with taking the contact space report counts,
 * and applying the report type information to the data to create the report.
 * It first creates all static columns before calculating formula columns.
 */

export default class ReportGenerator {
  constructor({ reportType, data, outcomes, groups, kpis }) {
    this.reportType = reportType;
    this.data = data;
    this.outcomes = outcomes;
    this.groups = groups;
    this.kpis = kpis;
    this.finalReport = {};
    this.kpisCols = ['Contact Target', 'Conversion Target'];
    this.final = [];
  }

  generate() {
    return Promise.map(
      this.data,
      // generate all static data first
      this._generateStaticRow.bind(this)
    ).then(final => {
      // store this in the class variable to access the results when
      // generating formula based columns
      this.final = final;
      // generate all the formula data
      return Promise.map(this.data, this._generateFormulaRow.bind(this));
    });
  }

  // used to retrieve a list of outcomes that exist within the outcome group
  _getOutcomesInGroup(groupName) {
    return this.outcomes
      .map(outcome => {
        const exists =
          outcome.groups.filter(
            group => group.name.toLowerCase() === groupName.toLowerCase()
          ).length > 0;
        if (exists) return outcome.name;
      })
      .filter(t => t);
  }

  _handleOutcomeGroup(row, column) {
    // return a list of outcomes in the group associated with the column value
    const outcomes = this._getOutcomesInGroup(column.value);

    // add up all the counts for matching outcomes
    return row.outcomes
      .map(obj => {
        if (outcomes.indexOf(obj.outcome) !== -1) return Number(obj.count);
      })
      .filter(t => t)
      .reduce((total, t) => total + t, 0);
  }

  _isOutcomeGroup(groupName) {
    // some static columns use kpi values not found in outcome groups.
    return this.groups.filter(group => group.name === groupName).length > 0;
  }

  _handleStaticColumn(row, column) {
    // handle basic outcome group summing
    if (this._isOutcomeGroup(column.value)) {
      return {
        name: column.name,
        value: this._handleOutcomeGroup(row, column)
      };
    }
    // retrieve Contact Target and Conversion Target from the campaignKPI table
    if (this.kpisCols.indexOf(column.value) !== -1) {
      return this._handleKpiColumn(row, column);
    }

    // retrieve the hours from the cph file uploaded
    if (column.value === 'Hours') {
      return {
        name: column.name,
        value: row.hours
      };
    }
  }

  _handleKpiColumn(row, column) {
    // retrieve the campaign kpis
    const kpi = this.kpis.filter(kpi => kpi.name === row.name);

    if (kpi.length > 0) {
      if (column.value === 'Contact Target') {
        return { name: column.name, value: Number(kpi[0].contact) };
      }
      return {
        name: column.name,
        value: Number(kpi[0].conversion / 100),
        isPercentage: true
      };
    }
    // if they dont exist return 0;
    return { name: column.name, value: 0 };
  }

  _generateStaticRow(row) {
    // rows refers to the rows of contact space report data
    const finalRow = this.reportType.columns.map(column => {
      if (column.type === 'static') {
        return this._handleStaticColumn(row, column);
      }
    });
    // here row.name is the campaign / agent and results is the accumulation of static values
    // we leave the formula values in the array undefined to match back to later
    return { name: row.name, results: finalRow };
  }

  _calculate(value1, operator, value2) {
    switch (operator) {
      case '*':
        return (value1 * value2).toFixed(0);
      case '/':
        if (value2 === 0) return 0;

        return value1 / value2;
      case '-':
        return value1 - value2;
      case '+':
        return value1 + value;
    }
  }

  _retrieveExistingFormulaValue(row, valueName, finalRow) {
    // retrieve the existing column vale from the finalRow object
    // this object is passed through at each stage so that formula columns
    // that rely upon other formula columns can use the results
    const result = finalRow.filter(t => t && t.name === valueName);

    if (result.length < 1) {
      // if there was no matching column name then the formula refers to
      // an outcome group
      return this._handleOutcomeGroup(row, { value: valueName });
    }
    return result[0].value;
  }

  _handleFormulaColumn(row, column, finalRow) {
    const value1 = this._retrieveExistingFormulaValue(
      row,
      column.value1,
      finalRow
    );
    const value2 = this._retrieveExistingFormulaValue(
      row,
      column.value2,
      finalRow
    );

    const result = this._calculate(
      Number(value1),
      column.operator,
      Number(value2)
    );

    return {
      name: column.name,
      value: result,
      isPercentage: column.isPercentage
    };
  }

  _generateFormulaRow(row) {
    // add all the static values already generaeted to the finalRow object
    // these static values will need to be used by formulas.
    const finalRow = this.reportType.columns.map((column, i) => {
      if (column.type === 'static') {
        return this.final.filter(t => t.name === row.name)[0].results[i];
      }
    });

    // mutate the finalRow array adding the results of each formula before passing
    // the updated object to the next formula calculation. This is because some
    // formulas may rely upon other formula based calculations
    this.reportType.columns.forEach((column, i) => {
      if (column.type === 'formula') {
        finalRow[i] = this._handleFormulaColumn(row, column, finalRow);
      }
    });

    return { name: row.name, results: finalRow };
  }
}
