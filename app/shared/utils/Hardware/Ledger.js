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
    if (this.transport) {
      const { device } = this.transport;
      // transport.close() can hang on a pending exchange; close the HID handle directly.
      if (device && device.close) {
        try { device.close(); } catch (e) {} // eslint-disable-line no-empty
      } else if (this.transport.close) {
        this.transport.close();
      }
    }
    this.transport = false;
  }
}
