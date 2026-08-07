const releaseConfig = require('./electron-builder.json');

module.exports = {
  ...releaseConfig,
  win: {
    icon: releaseConfig.win.icon,
    signtoolOptions: releaseConfig.win.signtoolOptions,
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
  },
};
