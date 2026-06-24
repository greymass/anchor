const releaseConfig = require('./electron-builder.json');

module.exports = {
  ...releaseConfig,
  win: {
    icon: releaseConfig.win.icon,
    publisherName: releaseConfig.win.publisherName,
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
  },
};
