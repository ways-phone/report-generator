import FileParser from './FileParser';

export default class CampaignParser extends FileParser {
  INITIATIVE_NAME = 'Initiative Name';

  parse() {
    const csv = this.readFile();
    const parsed = this.convertToJSON(csv);
    if (!this.isCPHFile()) return this.combineRows(parsed.data, this.INITIATIVE_NAME);
    return this.getHours(parsed.data, this.INITIATIVE_NAME);
  }
}
