import { dialog } from 'electron';
import packageJson from '../../../package.json';

function currentVersion() {
  const { version } = packageJson;
  const commitHash = require('child_process')
    .execSync('git rev-parse --short HEAD')
    .toString();
  dialog.showMessageBox({
    type: 'info',
    title: 'Current Version',
    message: `
      Version: ${version}
      Commit hash: ${commitHash}
    `,
    buttons: ['Close']
  });
}

module.exports.currentVersion = currentVersion;
