const releaseConfig = require('./electron-builder.json');

module.exports = {
  ...releaseConfig,
  // Local builds are intentionally unsigned: `win.azureSignOptions` from the release
  // config is omitted so packaging works without Azure Trusted Signing credentials.
  win: {
    icon: releaseConfig.win.icon,
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
  },
};
