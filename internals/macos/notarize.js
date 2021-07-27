require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  if (!('APPLEID' in process.env && 'APPLEIDPASS' in process.env)) {
    console.warn('Skipping notarizing step. APPLEID and APPLEIDPASS env variables must be set');
    console.log(process.env)
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  await notarize({
    appBundleId: 'com.greymass.anchordesktop.release',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};
