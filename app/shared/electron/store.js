const electron = require('electron');

if (typeof electron !== 'object') {
  class MemoryStore {
    constructor() {
      this.store = {};
    }

    get size() {
      return Object.keys(this.store).length;
    }

    clear() {
      this.store = {};
    }

    delete(key) {
      delete this.store[key];
    }

    get(key) {
      return this.store[key];
    }

    has(key) {
      return Object.prototype.hasOwnProperty.call(this.store, key);
    }

    set(key, item) {
      this.store[key] = item;
    }
  }

  module.exports = MemoryStore;
} else {
  if (!electron.app && !electron.remote) {
    Object.defineProperty(electron, 'remote', {
      configurable: true,
      value: require('@electron/remote')
    });
  }

  module.exports = require('electron-store');
}
