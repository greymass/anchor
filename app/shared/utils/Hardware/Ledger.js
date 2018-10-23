let instance;
export default class HardwareLedger {
  constructor(transport = false) {
    if (instance) {
      return instance;
    }
    this.transport = transport;
    instance = this;
    return instance;
  }
  destroy() {
    instance = false;
    this.transport = false;
  }
}
