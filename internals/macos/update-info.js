const fs = require('fs');
const path = require('path');

// electron-updater compares this against os.release(), which on macOS is the Darwin
// version, so blocking macOS 11 means Darwin 21.0.0 rather than 12.0. electron-builder's
// ReleaseInfo schema rejects the field, so it is written here instead of in the config.
const MINIMUM_DARWIN_VERSION = '21.0.0';

const manifest = path.join(__dirname, '..', '..', 'release', 'latest-mac.yml');

if (!fs.existsSync(manifest)) {
  console.error(`update-info: ${manifest} not found`);
  process.exit(1);
}

const contents = fs.readFileSync(manifest, 'utf8');

if (/^minimumSystemVersion:/m.test(contents)) {
  console.log('update-info: minimumSystemVersion already present');
  process.exit(0);
}

fs.writeFileSync(manifest, `${contents.replace(/\n+$/, '')}\nminimumSystemVersion: ${MINIMUM_DARWIN_VERSION}\n`);
console.log(`update-info: set minimumSystemVersion to ${MINIMUM_DARWIN_VERSION}`);
