const Api = require('../../actions/helpers/hardware/ledger').default;

export default class HardwareLedger {
  constructor(transport = false) {
    this.transport = transport;
    if (transport) {
      this.api = new Api(transport);
    }
    return this;
  }
  destroy() {
    if (this.transport && this.transport.close) {
      this.transport.close();
    }
    this.transport = false;
  }
}
