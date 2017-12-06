import xlsx from 'xlsx';
import { LETTERS } from '../utils/letters';

export default class ExcelWriter {
  constructor(report) {
    this.report = report;
    this.final = this._formatReport(report);
    this.wb = xlsx.utils.book_new();
  }

  saveReport(path) {
    if (!path) return;
    const report = this.final;
    try {
      const wb = this.wb;
      wb.Sheets = {};
      wb.SheetNames.push('Report');

      const sheet = xlsx.utils.json_to_sheet(report);
      this._formatColumns(sheet);

      wb.Sheets['Report'] = sheet;

      xlsx.writeFile(wb, path + '.xlsx', { bookType: 'xlsx' });
      return { success: true, msg: 'Report successfully downloaded' };
    } catch (e) {
      return { success: false, msg: `Something went rong ${e}` };
    }
  }

  _getCellLetter(cellName) {
    return cellName.replace(/\d/g, '');
  }

  _getCellNumber(cellName) {
    return cellName.replace(/[^0-9]/g, '');
  }

  _retrieveRow(sheet, rowNum) {
    const row = [];
    Object.keys(sheet).forEach(cellName => {
      const num = this._getCellNumber(cellName);
      console.log('cell number: ', num);
      if (num == rowNum) row.push(sheet[cellName]);
    });

    return row;
  }

  _retrieveHeaders(sheet) {
    return this._retrieveRow(sheet, 1);
  }

  _retrieveCol(sheet, colLetter) {
    const col = [];
    Object.keys(sheet).forEach(cellName => {
      const letter = this._getCellLetter(cellName);
      if (letter == colLetter) col.push(sheet[cellName]);
    });
    return col;
  }

  _formatColumns(sheet) {
    const headers = this._retrieveHeaders(sheet);
    const row = this.report[0].results;

    Object.keys(sheet).forEach(cellName => {
      const letter = this._getCellLetter(cellName);
      const index = LETTERS.indexOf(letter);
      const header = headers[index];
      let z = 'General';

      if (header) {
        const result = row.filter(t => t.name === header.v)[0];
        z = result && result.isPercentage ? '0.00%' : 'General';
      }
      const cell = sheet[cellName];

      try {
        cell.z = z;
        cell.v = Number(cell.v) || cell.v;
      } catch (e) {}
    });

    sheet['!autofilter'] = { ref: sheet['!ref'] };
  }

  _formatReport(report) {
    let addedTotal = false;
    const final = [];

    report.forEach(row => {
      const formatted = {};
      formatted.Name = row.name;

      if (row.name === 'Total') {
        final.push(this._createTotal());
        addedTotal = true;
      } else {
        row.results.forEach(result => {
          const name = result.name;
          const value = result.value;
          if (result.isPercentage) {
            formatted[name] = Number.parseFloat(value, 10);
          } else if (value === '0' || value === 0) {
            formatted[name] = '';
          } else if (value.toString().match(/\d/)) {
            formatted[name] = Number.parseFloat(value, 10);
          } else {
            formatted[name] = Number.parseFloat(value, 10);
          }
        });

        final.push(formatted);
      }
    });

    if (!addedTotal) {
      final.push(this._createTotal());
    }

    return final;
  }

  _createTotal() {
    const report = this.report;
    const total = {};

    report.forEach(row => {
      if (row.name === 'Total') return;
      row.results.forEach(result => {
        const name = result.name;
        const value = result.value;
        if (result.isPercentage) {
          total[name] = '';
        } else if (name === 'Hours') {
          total[name] = !total[name]
            ? (total[name] = Number(value))
            : (total[name] += Number(value));
        } else if (!total[name]) {
          total[name] = value;
        } else {
          total[name] += value;
        }
      });
    });
    total.Name = 'Total';
    return total;
  }
}
