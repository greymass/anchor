import { dialog } from 'electron';
import packageJson from '../../../package.json';

function currentVersion() {
  const { version } = packageJson;
  dialog.showMessageBox({
    type: 'info',
    title: 'Current Version',
    message: `
      Version: ${version}
      Commit hash: ${process.env.COMMITHASH}
    `,
    buttons: ['Close']
  });
}

module.exports.currentVersion = currentVersion;
