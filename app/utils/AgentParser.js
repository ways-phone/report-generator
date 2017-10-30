import FileParser from './FileParser';

export default class AgentParser extends FileParser {
  AGENT_NAME = 'Agent Name';

  parse() {
    const csv = this.readFile();
    const parsed = this.convertToJSON(csv);
    if (!this.isCPHFile()) return this.combineRows(parsed.data, this.AGENT_NAME);
    return this.getHours(parsed.data, this.AGENT_NAME);
  }
}
