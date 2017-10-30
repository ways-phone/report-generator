import Papa from 'papaparse';

import fs from 'fs';

export default class FileParser {
  OUTCOME = 'Outcome';
  COUNT = 'Count';
  HOURS = 'Logged In Time (Hours)';
  constructor(path) {
    this.path = path;
    this.name = this.getName(path);
  }

  getName() {
    if (!this.path) return '';
    const split = this.path.split('\\');
    return split[split.length - 1];
  }

  readFile() {
    return fs.readFileSync(this.path, 'utf-8');
  }

  convertToJSON(csv) {
    const split = csv.split('\n');
    const raw = split.slice(3, split.length - 1).join('\n');

    return Papa.parse(raw, { header: true });
  }

  getHours(rows, key) {
    const parsed = rows
      .map(row => {
        if (name[0] === '*') return '';
        if (name.split(' ')[0] === 'Showing') return '';
        return {
          name: row[key],
          hours: row[this.HOURS],
        };
      })
      .filter(t => t);
    return parsed;
  }

  combineRows(rows, key) {
    const parsed = [];
    const names = [];
    rows.forEach(row => {
      const name = row[key];
      if (names.indexOf(name) !== -1) return;
      if (name[0] === '*') return;
      if (name.split(' ')[0] === 'Showing') return;
      names.push(name);

      const obj = { name, outcomes: [] };

      const results = rows.filter(item => item[key] === name);

      results.forEach(result => {
        obj.outcomes.push({ outcome: result[this.OUTCOME], count: result[this.COUNT] });
      });

      parsed.push(obj);
    });

    return parsed;
  }

  isCPHFile() {
    return !!this.name.match(/.*cph.csv$/);
  }
}
