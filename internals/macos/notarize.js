require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  if (process.env.APPLEID && process.env.APPLEIDPASS) {
    return notarize({
      appBundleId: 'com.greymass.anchordesktop.release',
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEIDPASS,
    });
  }
  console.log('No APPLEID or APPLEIDPASS defined, skipping notarization.');
};
