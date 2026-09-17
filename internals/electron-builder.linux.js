const releaseConfig = require('./electron-builder.json');

module.exports = {
  ...releaseConfig,
  // node-hid and usb ship ABI-stable N-API prebuilds; rebuilding compiles node-addon-api 3.2.1, which GCC rejects against Electron 42 headers.
  npmRebuild: false,
};
