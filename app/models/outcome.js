export default class Outcome {
  state = {
    groups: [],
  };

  addProperty(key, value) {
    const newState = { ...this.state };
    newState[key] = value;
    this.state = newState;
  }

  getState() {
    return this.state;
  }
}
